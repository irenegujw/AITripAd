import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDpvGpHTbTjpnopRZbDm6NrLdcr4rC03tM",
    authDomain: "ai-trip-planner-7db35.firebaseapp.com",
    projectId: "ai-trip-planner-7db35",
    storageBucket: "ai-trip-planner-7db35.appspot.com",
    messagingSenderId: "674905110944",
    appId: "1:674905110944:web:40d9194662b46bc82c4cc5",
    measurementId: "G-8XLH6EEH41"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
//   const analytics = getAnalytics(app);