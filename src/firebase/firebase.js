import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let auth;
let googleProvider;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.error("CRITICAL ERROR: Firebase Environment Variables are missing! Please add VITE_FIREBASE_API_KEY etc. to your Vercel Project Settings -> Environment Variables.");
    // Mock to prevent immediate destructuring crashes
    auth = { 
      isMock: true,
      currentUser: null, 
      onAuthStateChanged: (cb) => { cb(null); return () => {}; },
      signOut: async () => {}
    };
    googleProvider = {};
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { auth, googleProvider };
