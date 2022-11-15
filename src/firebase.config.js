// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJcBdlBFkSO4I1_ZbIiEKFtlKeGK2RXTg",
  authDomain: "twitterclone-ef157.firebaseapp.com",
  projectId: "twitterclone-ef157",
  storageBucket: "twitterclone-ef157.appspot.com",
  messagingSenderId: "810131028799",
  appId: "1:810131028799:web:f683deb0b4512c1ba0718a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
