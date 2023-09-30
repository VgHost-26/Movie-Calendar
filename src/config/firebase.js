import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth" 
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCe4riI674SqXV4xI1HLgToS_fIqm4NH_M",
  authDomain: "movie-calendar-martinez.firebaseapp.com",
  projectId: "movie-calendar-martinez",
  storageBucket: "movie-calendar-martinez.appspot.com",
  messagingSenderId: "773941877569",
  appId: "1:773941877569:web:fdb886ba04ad3d72dadfc0",
  measurementId: "G-MSMN9MNTX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const firestore = new getFirestore(app)
export const storage = new getStorage(app)
