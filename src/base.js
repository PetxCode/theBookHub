import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"


export const app = firebase.initializeApp({
  apiKey: "AIzaSyDeCevRjS8OKWcwJjk3dGHF0cx7kSufRGk",
  authDomain: "crowd-funding-platform.firebaseapp.com",
  projectId: "crowd-funding-platform",
  storageBucket: "crowd-funding-platform.appspot.com",
  messagingSenderId: "243731795634",
  appId: "1:243731795634:web:cd3260fa99db3ab17703ab"
})