/* TODO 
  -nazwy dni tygodnia
*/
import { useEffect, useReducer, useState } from "react"
import { Calendar } from "./components/Calendar"
import { SidePanel } from "./components/SidePanel"
import { TopPanel } from "./components/TopPanel"
import "./style.css"
import { compareMovie } from "./functions"
import { auth, firestore, googleProvider, storage } from "./config/firebase"
import { getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore"
import { signInWithPopup, signOut } from "firebase/auth"
import { ref, listAll, getDownloadURL } from "firebase/storage"
import { platforms } from "./globals"
import PicScout from "picscout"

export default function App() {
  const [hiddenSidePanel, setHiddenSidePanel] = useState(false)
  const [hiddenTopPanel, setHiddenTopPanel] = useState(false)
  const [movies, setMovies] = useState(() => {
    if (auth.currentUser == null) {
      // if there is no firebase user get local storage movies
      const localVal = localStorage.getItem("MOVIES")
      if (localVal == null) return []
      return JSON.parse(localVal)
    }
  })

  useEffect(() => {
    if (auth.currentUser == null) {
      localStorage.setItem("MOVIES", JSON.stringify(movies))
    }

    auth.onAuthStateChanged(() => {
      if (currUser !== auth.currentUser) {
        getMoviesFirebase()
      }
    })
    
  }, [movies])
  
  
  
  // ----- firebase ------
  
  const stateReducer = (state, action) => ({
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  });

  const [currUser, setCurrUser] = useState(auth.currentUser)
  const [logosURLs, setLogosURLs] = useReducer(stateReducer, {})
  const [iconsURLs, setIconsURLs] = useReducer(stateReducer, {})
  const [bgURLs, setBgURLs] = useReducer(stateReducer, {})
  const [otherImagesURLs,setOtherIimagesURLs] = useReducer(stateReducer, {})
  
  // refs
  const moviesRef = collection(firestore, "movies")
  const iconsRef = ref(storage, "assets/icons")
  const logosRef = ref(storage, "assets/logos")
  const bgRef = ref(storage, "assets/backg")
  const otherRef = ref(storage, "assets/other")
  
  async function getLogosURLs() {
    const logos = await listAll(logosRef)
    logos.items.map(async item => {
      const name = item.fullPath.slice(13, item.fullPath.indexOf("-"))
      const url = await getDownloadURL(item)
      setLogosURLs(prev => ({...prev,  [name]: url }))
    })
  }
  async function getImages(ref, setFunc) {
    const items = await listAll(ref)
    items.items.map(async item => {
      const name = item.fullPath.slice(13, item.fullPath.indexOf("."))
      const url = await getDownloadURL(item)
      setFunc(prev => ({...prev,  [name]: url }))
    })
  }
  
  // getting images from storage
  useEffect(() => {
    
    getLogosURLs()
    getImages(iconsRef, setIconsURLs)
    getImages(bgRef, setBgURLs)
    getImages(otherRef, setOtherIimagesURLs)
  }, [])
  
  document.getElementsByTagName('body')[0].style.backgroundImage = `url(${bgURLs['background_02-h']})`

  async function getMoviesFirebase() {
    try {
      const data = await getDocs(moviesRef)
      let filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }))
      filteredData = filteredData
        .filter(movie => movie.userId === auth.currentUser.uid)
        .sort(compareMovie)
      setMovies(filteredData)
    } catch (err) {
      console.log(err)
    }
  }

  async function addNewMovieFirebase(title, platform, date) {
    try {
      await addDoc(moviesRef, {
        title: title,
        platform: platform,
        date: date,
        userId: auth.currentUser.uid,
      })
      getMoviesFirebase()
    } catch (err) {
      console.log(err)
    }
  }

  async function addNewMovie(title, platform, date) {
    if (auth.currentUser == null) {
      // no user, add movie to local storage
      setMovies(currentMovies => {
        return [
          ...currentMovies,
          { title: title, platform: platform, date: date },
        ].sort(compareMovie)
      })
    } else {
      // add new movie to firestore
      addNewMovieFirebase(title, platform, date)
    }
  }
  async function deleteMovieFirestore(id) {
    try {
      const movieDoc = doc(firestore, "movies", id)
      await deleteDoc(movieDoc)
      getMoviesFirebase()
    } catch (err) {
      console.log(err)
    }
  }
  function deleteMovie(movieToDelete) {
    if (auth.currentUser == null) {
      // delete local movie

      setMovies(movies.filter(movie => movie !== movieToDelete))
    } else {
      // delete firestore movie
      deleteMovieFirestore(movieToDelete.id)
    }
  }

  // ------- firebase auth -------

  async function logInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
      getMoviesFirebase()
    } catch (error) {
      console.log(error)
    }
  }

  async function logOut() {
    try {
      await signOut(auth)
      const localVal = localStorage.getItem("MOVIES")
      if (localVal == null) setMovies([])
      setMovies(JSON.parse(localVal))
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div
        id="grid"
        expand-top={String(hiddenTopPanel)}
        expand-left={String(hiddenSidePanel)}
      >
        <TopPanel
          images={{logos:logosURLs, icons:iconsURLs, other: otherImagesURLs}}
          logInWithGoogle={logInWithGoogle}
          logOut={logOut}
          onSubmit={addNewMovie}
          hidden={hiddenTopPanel}
        />
        <Calendar
          images={{logos:logosURLs, icons:iconsURLs}}
          movies={movies}
          isExpanded={hiddenSidePanel || hiddenTopPanel}
          expandFunction={() => {
            hiddenTopPanel && hiddenSidePanel
              ? (setHiddenTopPanel(false), setHiddenSidePanel(false))
              : (setHiddenTopPanel(true), setHiddenSidePanel(true))
          }}
        />
        <SidePanel
          images={{logos:logosURLs, icons:iconsURLs}}
          movies={movies}
          hidden={hiddenSidePanel}
          deleteMovie={deleteMovie}
          hideFunction={() => {
            hiddenSidePanel
              ? setHiddenSidePanel(false)
              : setHiddenSidePanel(true)
          }}
        />
      </div>
    </>
  )
}
