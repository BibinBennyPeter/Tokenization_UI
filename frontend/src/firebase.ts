// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYQnMGiAB6Ki-ZXwGJ6sgeduCaXlccUtA",
  authDomain: "laoz-vestrix.firebaseapp.com",
  projectId: "laoz-vestrix",
  storageBucket: "laoz-vestrix.firebasestorage.app",
  messagingSenderId: "66899855383",
  appId: "1:66899855383:web:462fbdeba5a020f2917452",
  measurementId: "G-B26CN5ZHNB"
};


const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
