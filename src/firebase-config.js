// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCidMpVYkbDX05LJqR11dFMCb7HQKzIWAI",
  authDomain: "blogproject-40638.firebaseapp.com",
  projectId: "blogproject-40638",
  storageBucket: "blogproject-40638.appspot.com",
  messagingSenderId: "460949506719",
  appId: "1:460949506719:web:5c0b5ba1214af32bb5f0aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);