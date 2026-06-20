import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBMsYj9uqKfNgA5dClOvWP5uJG3S7GhPpc",
  authDomain: "gen-lang-client-0379921865.firebaseapp.com",
  projectId: "gen-lang-client-0379921865",
  storageBucket: "gen-lang-client-0379921865.firebasestorage.app",
  messagingSenderId: "623712884914",
  appId: "1:623712884914:web:82e5930e0d315d6f75d1ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (utilizing custom database ID from config if defined, or defaulting)
export const db = getFirestore(app, "ai-studio-441be5c7-c260-4f2f-8358-88b5865080c6");

export {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp
};
