import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0NqO-Oo3BRzpHBczdiH6KfZFkLUX1tgs",
  authDomain: "cloudfiles-7a01e.firebaseapp.com",
  projectId: "cloudfiles-7a01e",
  storageBucket: "cloudfiles-7a01e.appspot.com",
  messagingSenderId: "1048301668679",
  appId: "1:1048301668679:web:00d4a02337d9db1237a462",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// getAuth(firebase);
// Finally, export it to use it throughout your app
export default firebase;
