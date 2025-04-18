// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import 'dotenv/config'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "newp-f68bc.firebaseapp.com",
  projectId: "newp-f68bc",
  storageBucket: "newp-f68bc.firebasestorage.app",
  messagingSenderId: "244086962684",
  appId: "1:244086962684:web:5dfac113101f91b7a09a79",
  measurementId: "G-H3K8QRJ8DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);






/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "newp-f68bc.firebaseapp.com",
  projectId: "newp-f68bc",
  storageBucket: "newp-f68bc.firebasestorage.app",
  messagingSenderId: "244086962684",
  appId: "1:244086962684:web:b7a044183e9bb9c2a09a79",
  measurementId: "G-15GN70W4VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); */
