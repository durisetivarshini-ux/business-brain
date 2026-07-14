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
import { auth, googleProvider } from '../firebase/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (auth?.isMock) {
      console.warn("Using Mock Login (Firebase missing)");
      const mockUser = { uid: 'mock-123', email, displayName: 'Demo User', photoURL: 'https://ui-avatars.com/api/?name=Demo+User' };
      setUser(mockUser);
      return { user: mockUser };
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (name, email, password) => {
    if (auth?.isMock) {
      console.warn("Using Mock Register (Firebase missing)");
      const mockUser = { uid: 'mock-123', email, displayName: name, photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}` };
      setUser(mockUser);
      return { user: mockUser };
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name
    });
    // Trigger state update by manually setting it since updateProfile doesn't trigger onAuthStateChanged with the new name immediately
    setUser({ ...userCredential.user, displayName: name });
    return userCredential;
  };

  const googleLogin = async () => {
    if (auth?.isMock) {
      console.warn("Using Mock Google Login (Firebase missing)");
      const mockUser = { uid: 'mock-google-123', email: 'demo@google.com', displayName: 'Google User', photoURL: 'https://ui-avatars.com/api/?name=Google+User' };
      setUser(mockUser);
      return { user: mockUser };
    }
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    if (auth?.isMock) {
      setUser(null);
      return;
    }
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    if (auth?.isMock) {
      console.warn("Mock Password Reset");
      return;
    }
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (data) => {
    if (auth?.isMock) {
      setUser(prev => ({ ...prev, ...data, displayName: data.name || prev?.displayName }));
      return;
    }
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: data.name || auth.currentUser.displayName,
        photoURL: data.avatarUrl || auth.currentUser.photoURL
      });
      setUser({ ...auth.currentUser, ...data, displayName: data.name || auth.currentUser.displayName });
    }
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
