import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config (fill from Firebase console)

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxFM8Hy_ecZ3nIteIGgfrfmuYcKmj4MoQ",
    authDomain: "shuttersnap-1c78f.firebaseapp.com",
    databaseURL: "https://shuttersnap-1c78f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shuttersnap-1c78f",
    storageBucket: "shuttersnap-1c78f.firebasestorage.app",
    messagingSenderId: "537533584757",
    appId: "1:537533584757:web:2b6ecc00d22ab8c9a36f3c",
    measurementId: "G-W18C630RQM"
};

const app = initializeApp(firebaseConfig);

// Firestore database export
export const db = getFirestore(app);