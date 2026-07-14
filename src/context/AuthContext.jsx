import React, { createContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithRedirect,
  getRedirectResult,
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

    // Handle Redirect Result for Google Sign-In
    getRedirectResult(auth).then(async (userCredential) => {
      if (userCredential && db) {
        try {
          const userRef = doc(db, "users", userCredential.user.uid);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
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
            await setDoc(userRef, {
              lastLogin: serverTimestamp()
            }, { merge: true });
          }
        } catch (err) {
          console.error("Failed to sync Redirect Google user with Firestore:", err);
        }
      }
    }).catch(err => {
      console.error("Redirect Auth Error:", err);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!auth) throw new Error("Firebase Authentication is not configured.");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login
    if (db) {
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          lastLogin: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn("Failed to update last login:", err);
      }
    }
    
    return userCredential;
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
    if (!auth) throw new Error("Firebase Authentication is not configured.");
    return signInWithRedirect(auth, googleProvider);
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
