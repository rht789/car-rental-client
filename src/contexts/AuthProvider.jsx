import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxios from "../hooks/useAxios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axios = useAxios();

  const googleProvider = new GoogleAuthProvider();

  const saveUserToBackend = async (userInfo) => {
    try {
      const response = await axios.post("/users", {
        uid: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName || 'No Name',
        photoURL: userInfo.photoURL || null,
      });
      console.log("User saved to backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving user to backend:", error);
      throw error;
    }
  };

  const createUser = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToBackend(result.user);
    return result;
  };

  const loginUserwithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserToBackend(result.user);
    return result;
  };

  const loginUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await saveUserToBackend(result.user);
    return result;
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const authInfo = {
    createUser,
    loginUser,
    loginUserwithGoogle,
    signOutUser,
    user,
  };
  return (
    <div>
      <AuthContext value={authInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
