import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth" 
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "VITE_API_KEY",
  authDomain: "VITE_AUTH_DOMAIN",
  projectId: "VITE_PROJECT_ID",
  storageBucket: "VITE_PROJECT_ID.appspot.com",
  messagingSenderId: "VITE_MESSAGING_SENDER_ID",
  appId: "1:VITE_MESSAGING_SENDER_ID:web:fdb886ba04ad3d72dadfc0",
  measurementId: "VITE_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const firestore = new getFirestore(app)
export const storage = new getStorage(app)
