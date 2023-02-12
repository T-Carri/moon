
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import firebase from 'firebase/app';
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore";
//wtf?REACT_APP_FIREBASE_DATABASE_URL=
import { getPerformance } from "firebase/performance";
const firebaseConfig = {
    apiKey: "AIzaSyAkMIrDJ9dLqZUGT2kLi5HPvedMeTfmgFs",
    authDomain: "moon-3ffcb.firebaseapp.com",
    projectId: "moon-3ffcb",
    storageBucket: "moon-3ffcb.appspot.com",
    messagingSenderId: "911427937250",
    appId: "1:911427937250:web:b8edb8aa43017f2ae70fbb"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth= getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore()
//export const db = firebase.firestore();
const perf = getPerformance(app)


export default app