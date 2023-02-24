import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true)
  
  const signInUsingGoogle = () => {
    setLoading(true)
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const registerUserWithEmailPassword = (email, password) => {
  setLoading(true)
  return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginUserWithEmailPassword = (email, password) => {
  setLoading(true)
  return  signInWithEmailAndPassword(auth, email, password)
  }

  
  const userUpdateProfile = (name) => {
    setLoading(true)
   return updateProfile(auth.currentUser, {
      displayName: name
    })
  }

  const userLogout = () => {
    signOut(auth)
    .then(()=> {
    toast.success(`${user.displayName} logout successfully`)
    })
  }

  useEffect(() => {
  
  const unsubscribed = onAuthStateChanged(auth, currentUser=>{
    setUser(currentUser)
    setLoading(false)
  })

  return ()=> unsubscribed
  }, [])


  const authInfo = {
    signInUsingGoogle,
    user,
    setUser,
    userLogout,
    registerUserWithEmailPassword,
    userUpdateProfile,
    loginUserWithEmailPassword,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
