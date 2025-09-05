// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAhiPbJ2KnCp1ddMH6J1zcmctJIL347mQw",
  authDomain: "icare-f55a9.firebaseapp.com",
  projectId: "icare-f55a9",
  storageBucket: "icare-f55a9.firebasestorage.app",
  messagingSenderId: "441797624635",
  appId: "1:441797624635:web:0804b0cd5f0f96e7576d1e",
  measurementId: "G-YQLDWHF6JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app);