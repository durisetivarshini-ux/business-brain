import React, { createContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    console.log("AuthContext: login called");
    if (!auth) {
      console.error("AuthContext: Firebase Authentication is not configured.");
      throw new Error("Firebase Authentication is not configured.");
    }
    
    try {
      console.log("AuthContext: Calling signInWithEmailAndPassword...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("AuthContext: signInWithEmailAndPassword succeeded", userCredential.user.uid);
      
      // Update last login
      if (db) {
        console.log("AuthContext: Updating lastLogin in Firestore...");
        (async () => {
          try {
            await Promise.race([
              setDoc(doc(db, "users", userCredential.user.uid), {
                lastLogin: serverTimestamp()
              }, { merge: true }),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout")), 5000))
            ]);
            console.log("AuthContext: Firestore update succeeded");
          } catch (err) {
            console.warn("AuthContext: Failed to update last login:", err.message);
          }
        })();
      }
      
      return userCredential;
    } catch (error) {
      console.error("AuthContext: signInWithEmailAndPassword FAILED", error.code, error.message);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    if (!auth) throw new Error("Firebase Authentication is not configured.");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(userCredential.user, {
      displayName: name
    });
    
    // Create user document in Firestore
    if (db) {
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          fullName: name,
          email: email,
          photoURL: userCredential.user.photoURL || "",
          role: "user",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } catch (err) {
        console.error("Failed to create Firestore user document:", err);
      }
    }
    
    setUser({ ...userCredential.user, displayName: name });
    return userCredential;
  };

  const googleLogin = async () => {
    console.log("AuthContext: googleLogin called");
    if (!auth) {
      console.error("AuthContext: Firebase Authentication is not configured.");
      throw new Error("Firebase Authentication is not configured.");
    }
    
    try {
      console.log("AuthContext: Calling signInWithPopup(auth, googleProvider)...");
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log("AuthContext: signInWithPopup succeeded", userCredential.user.uid);
      
      if (db) {
        console.log("AuthContext: Checking Firestore for existing Google user...");
        // Fire-and-forget: Do not block login if Firestore is uninitialized or hanging
        (async () => {
          try {
            const userRef = doc(db, "users", userCredential.user.uid);
            // Add a timeout to getDoc so it doesn't hang forever
            const userSnap = await Promise.race([
              getDoc(userRef),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout")), 5000))
            ]);
            
            if (!userSnap.exists()) {
              console.log("AuthContext: Creating new user document in Firestore");
              await setDoc(userRef, {
                uid: userCredential.user.uid,
                fullName: userCredential.user.displayName,
                email: userCredential.user.email,
                photoURL: userCredential.user.photoURL || "",
                role: "user",
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
              });
            } else {
              console.log("AuthContext: Updating existing user document in Firestore");
              await setDoc(userRef, {
                lastLogin: serverTimestamp()
              }, { merge: true });
            }
            console.log("AuthContext: Firestore sync succeeded");
          } catch (err) {
            console.error("AuthContext: Failed to sync Google user with Firestore:", err.message);
          }
        })();
      }
      
      return userCredential;
    } catch (error) {
      console.error("AuthContext: signInWithPopup FAILED", error.code, error.message);
      throw error;
    }
  };

  const logout = () => {
    if (!auth) return Promise.resolve();
    return signOut(auth);
  };

  const resetPassword = (email) => {
    if (!auth) throw new Error("Firebase Authentication is not configured.");
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (data) => {
    if (!auth || !auth.currentUser) return;
    
    await updateProfile(auth.currentUser, {
      displayName: data.name || auth.currentUser.displayName,
      photoURL: data.avatarUrl || auth.currentUser.photoURL
    });
    
    if (db) {
      try {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          fullName: data.name || auth.currentUser.displayName,
          photoURL: data.avatarUrl || auth.currentUser.photoURL
        }, { merge: true });
      } catch (err) {
        console.error("Failed to update Firestore profile:", err);
      }
    }
    
    setUser({ ...auth.currentUser, ...data, displayName: data.name || auth.currentUser.displayName });
  };

  const value = {
    user,
    login,
    register,
    googleLogin,
    logout,
    resetPassword,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
