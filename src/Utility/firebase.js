// src/Utility/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Firestore DB [web:84]

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8lXpkw6lu6XB-S9bp9CMHQfwJAOXXc2Y",
  authDomain: "clone-30657.firebaseapp.com",
  projectId: "clone-30657",
  storageBucket: "clone-30657.firebasestorage.app",
  messagingSenderId: "213996010970",
  appId: "1:213996010970:web:3ffe1df2a6516e3bcc54e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app); // for file uploads (images, etc.)
export const db = getFirestore(app); // for orders and other data [web:84][web:91]
