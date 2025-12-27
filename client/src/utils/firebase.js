// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-8b686.firebaseapp.com",
  projectId: "taskmanager-8b686",
  storageBucket: "taskmanager-8b686.firebasestorage.app",
  messagingSenderId: "1055418689210",
  appId: "1:1055418689210:web:cc10446f5149bf035bc483",
  measurementId: "G-MF0QM4141P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);