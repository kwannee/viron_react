import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyBDg620nc4dxyEfKQTEfVMaiaXomzzZ5J0",
  authDomain: "viron-57745.firebaseapp.com",
  databaseURL: "https://viron-57745.firebaseio.com",
  projectId: "viron-57745",
  storageBucket: "viron-57745.appspot.com",
  messagingSenderId: "849415377120",
  appId: "1:849415377120:web:e8eb93fc8fe48101e54085"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;