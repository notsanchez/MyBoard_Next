import firebase from "firebase/app";
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyB8RWLnQGxZ3P87_4b_LAmgJLlOjbbCO1c",
    authDomain: "myboardapp-d63e0.firebaseapp.com",
    projectId: "myboardapp-d63e0",
    storageBucket: "myboardapp-d63e0.appspot.com",
    messagingSenderId: "286627890775",
    appId: "1:286627890775:web:bf8f7bdff88a1b0b164512",
    measurementId: "G-CC0RPDJ3Z9"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;