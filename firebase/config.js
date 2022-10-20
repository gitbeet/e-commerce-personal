import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9Y2NjtvCSCsvcYaRiP0HQMZLxAQOa-wc",
  authDomain: "e-commerce-personal.firebaseapp.com",
  projectId: "e-commerce-personal",
  storageBucket: "e-commerce-personal.appspot.com",
  messagingSenderId: "944925112549",
  appId: "1:944925112549:web:bf2dc78c79708312cafc0c",
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
