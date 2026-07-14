import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA2-GCcNWgQ9LiKRJAYcl0scY8iRcMKh9w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "business-brain-4424c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "business-brain-4424c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "business-brain-4424c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "575965768724",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:575965768724:web:431c1cf7189a1ee3ed0b01",
};

let app;
let auth;
let googleProvider;
let db;

try {
  if (!firebaseConfig.apiKey) {
    throw new Error("Firebase Environment Variables are missing! Please add VITE_FIREBASE_API_KEY to your environment.");
  }
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export { auth, googleProvider, db };
