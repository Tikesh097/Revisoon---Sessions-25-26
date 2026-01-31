import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDntQJN1baifnqxcBSYT5ZM6sYmQqbzOYM",
  authDomain: "web205q12.firebaseapp.com",
  databaseURL: "https://web205q12-default-rtdb.firebaseio.com",
  projectId: "web205q12",
  storageBucket: "web205q12.firebasestorage.app",
  messagingSenderId: "94892415487",
  appId: "1:94892415487:web:10897d5ea1802e8dc32fca",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
