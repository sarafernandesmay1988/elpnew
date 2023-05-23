// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk7evWdwK5wlRgnIY2dyaW6bMGoS9aM8w",
  authDomain: "react-practice-74af3.firebaseapp.com",
  databaseURL: "https://react-practice-74af3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-practice-74af3",
  storageBucket: "react-practice-74af3.appspot.com",
  messagingSenderId: "702241771770",
  appId: "1:702241771770:web:667d1de154f06f0b953943",
  measurementId: "G-7C3RQXDCXK"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app)
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.firestore();
// export default firebase;
