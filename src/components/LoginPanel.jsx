import { auth, googleProvider } from "../config/firebase"
import {
  signInWithPopup,
  signOut,
} from "firebase/auth"

export default function LoginPanel({logInWithGoogle, logOut, images}) {



  return (
    <div className="login-panel">
      {auth.currentUser == null ? (
        <>
          <div className="profile-image">
            Guest
            <img draggable="false" src={images.other['guest']} />
          </div>
          <button className="login-button" onClick={logInWithGoogle}>
            Login with Google
          </button>
        </>
      ) : (
        <>
          <div className="profile-image">
            {auth.currentUser.displayName}
            <img draggable="false" src={auth.currentUser?.photoURL} />
          </div>
          <button className="login-button" onClick={logOut}>
            Logout
          </button>
        </>
      )}
      <button disabled className="settings-button">
        settings
      </button>
    </div>
  )
}
