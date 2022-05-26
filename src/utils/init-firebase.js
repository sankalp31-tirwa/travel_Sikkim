import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBWzbDj-vp_ecIZs9NVEniEm6qlcVbAC8",
  authDomain: "fir-tutorial-88816.firebaseapp.com",
  databaseURL: "https://fir-tutorial-88816-default-rtdb.firebaseio.com",
  projectId: "fir-tutorial-88816",
  storageBucket: "fir-tutorial-88816.appspot.com",
  messagingSenderId: "498718017846",
  appId: "1:498718017846:web:0645e6ecee10ca14218b97",
  measurementId: "G-6R39TRMKW1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const database = getFirestore(app);
