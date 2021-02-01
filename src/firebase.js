import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyDMRZJneEjRXW5Y1y-ulg9xxeuySSYsOG8",
    authDomain: "viron-react.firebaseapp.com",
    projectId: "viron-react",
    storageBucket: "viron-react.appspot.com",
    messagingSenderId: "412108273435",
    appId: "1:412108273435:web:d2599e3164411fcf1ac5be"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 export default firebase;