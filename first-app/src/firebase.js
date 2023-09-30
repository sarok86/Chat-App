import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDvT3a5VDxuiDXyrVVYPXtk45qWNGlrkzA",
    authDomain: "botogram-be03c.firebaseapp.com",
    projectId: "botogram-be03c",
    storageBucket: "botogram-be03c.appspot.com",
    messagingSenderId: "305952523599",
    appId: "1:305952523599:web:bf7dcd9b83ced555a9713a"
  }).auth();