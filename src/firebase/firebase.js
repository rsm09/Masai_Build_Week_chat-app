// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBbJfJwYowjUVAyE0ab7cMoEmsuhSgK24",
  authDomain: "letschat-34ccb.firebaseapp.com",
  projectId: "letschat-34ccb",
  storageBucket: "letschat-34ccb.firebasestorage.app",
  messagingSenderId: "806931963565",
  appId: "1:806931963565:web:cb7ad4b7fbb86b15eef024",
  measurementId: "G-SJWNKMJ8W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);