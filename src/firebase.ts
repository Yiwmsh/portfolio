import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXX6WLI8oN-Hn43xaschu-UmkecWWDVhY",
  authDomain: "portfolio-a1fa7.firebaseapp.com",
  databaseURL: "https://portfolio-a1fa7-default-rtdb.firebaseio.com",
  projectId: "portfolio-a1fa7",
  storageBucket: "portfolio-a1fa7.appspot.com",
  messagingSenderId: "640185037414",
  appId: "1:640185037414:web:7ebe892c40a10813f7f3a7",
  measurementId: "G-8GFQW9P3F4",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lc5m7EjAAAAAOP8HOGS4HA-9ioKPwyyDhsmz1le'),

  isTokenAutoRefreshEnabled: true
});

export const db = getFirestore(app);