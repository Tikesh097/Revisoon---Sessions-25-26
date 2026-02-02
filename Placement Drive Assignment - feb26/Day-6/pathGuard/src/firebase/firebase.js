import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';  // ✅ REQUIRED

const firebaseConfig = {
  apiKey: "AIzaSyDntQJN1baifnqxcBSYT5ZM6sYmQqbzOYM",
  authDomain: "web205q12.firebaseapp.com",
  databaseURL: "https://web205q12-default-rtdb.firebaseio.com",
  projectId: "web205q12",
  storageBucket: "web205q12.firebasestorage.app",
  messagingSenderId: "94892415487",
  appId: "1:94892415487:web:10897d5ea1802e8dc32fca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);  // ← This line was missing!
