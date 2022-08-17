import React, { useState, createContext } from "react";
import { loginRequest } from "./authentication.service";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import { db } from '../../../App';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });
  const onLogin = (email, password) => {

    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  };
/*function for fetching user data from users database*/

/*    getDocs(collection(db, "users")).then(docSnap => {
    let users = [];
    docSnap.forEach((doc)=> {
        users.push({ ...doc.data(), id:doc.id })
    });
        console.log("Document data:", users);
    });*/

  const onRegister = (userName, email, MobileNo, password, repeatedPassword) => {

    addDoc(collection(db, "users"),{
    userName: userName,
    MobileNo: MobileNo,
    })

    setIsLoading(true);

    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};