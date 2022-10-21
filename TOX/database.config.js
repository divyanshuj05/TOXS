import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
//import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSANGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env"
//console.log(API_KEY)

const firebaseConfig = {
    apiKey: "AIzaSyArsU76qtBJjgJ-GZXTQ9Bc5amkeHYx4Vw",
    authDomain: "toxs-110d5.firebaseapp.com",
    projectId: "toxs-110d5",
    storageBucket: "toxs-110d5.appspot.com",
    messagingSenderId: "880326269749",
    appId: "1:880326269749:web:9ae25f529b4c22bd9e0a7c",
    measurementId: "G-B1QTDC9JPC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const app = firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings({experimentalForceLongPolling:true, merge: true})
export const db = getFirestore(app);