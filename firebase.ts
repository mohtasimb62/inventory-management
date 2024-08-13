// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7uweSxDhZ7V0Ez19qB1GUBJsSntIUJF8",
  authDomain: "inventory-management-8a0aa.firebaseapp.com",
  projectId: "inventory-management-8a0aa",
  storageBucket: "inventory-management-8a0aa.appspot.com",
  messagingSenderId: "932875873419",
  appId: "1:932875873419:web:837e18128cfed87cfeb88e",
  measurementId: "G-V3645VTMBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }