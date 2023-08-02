// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: "pt-mall.firebaseapp.com",
  projectId: "pt-mall",
  storageBucket: "pt-mall.appspot.com",
  messagingSenderId: "233556849430",
  appId: "1:233556849430:web:6815ca5f26462b53579637",
  measurementId: "G-NLCQKWXCXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);