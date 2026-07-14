import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2-GCcNWgQ9LiKRJAYcl0scY8iRcMKh9w",
  authDomain: "business-brain-4424c.firebaseapp.com",
  projectId: "business-brain-4424c",
  storageBucket: "business-brain-4424c.firebasestorage.app",
  messagingSenderId: "575965768724",
  appId: "1:575965768724:web:431c1cf7189a1ee3ed0b01"
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
