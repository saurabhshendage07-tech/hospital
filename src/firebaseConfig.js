import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEt9NQWb6PkH1XDgmgjsQwBqS2UlCDlXQ",
  authDomain: "hospital-381e7.firebaseapp.com",
  projectId: "hospital-381e7",
  storageBucket: "hospital-381e7.firebasestorage.app",
  messagingSenderId: "327988841893",
  appId: "1:327988841893:web:f40e13a6b2343c009cec4c",
  measurementId: "G-WMDCDHBTT6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
