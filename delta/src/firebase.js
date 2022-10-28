// Import the functions you need from the SDKs you need
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ3u8uxBrexBDX_MjLHePKNvmD333e51w",
  authDomain: "delta-859a1.firebaseapp.com",
  databaseURL: "https://delta-859a1-default-rtdb.firebaseio.com",
  projectId: "delta-859a1",
  storageBucket: "delta-859a1.appspot.com",
  messagingSenderId: "385538735504",
  appId: "1:385538735504:web:703abb7ffb0d181a54c715",
  measurementId: "G-58J6ZNHBET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const databaseRef = firebase.database().ref();
// NOTE: export deltaData in other files to use the database
export const deltaData = databaseRef.child("delta");
export default firebase;