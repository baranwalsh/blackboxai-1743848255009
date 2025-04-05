// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2PGx4XOMypvY1ntMgVzENgR8ti96N2-4",
  authDomain: "zone-flow.firebaseapp.com",
  projectId: "zone-flow",
  storageBucket: "zone-flow.appspot.com",
  messagingSenderId: "1092018611877",
  appId: "1:1092018611877:web:05e35fa15a1a9828f18f4c",
  measurementId: "G-L247WT7XYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
