import React, { useState, createContext, useEffect } from "react";
import { loginCheck, RegisterCheck } from "./authentication.services";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../database.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLogging, setIsLogging] = useState(true)

  /*firebase.auth().onAuthStateChanged((u) => {
    if (u) {
      setUser(u);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });*/

  const onLogin = async (userName, password) => {
    let check = false;
    setIsLoading(true);

    const result = loginCheck(userName, password)
    if (result != true) {
      setError(result)
      setIsLoading(false)
      return
    }

    const loginQuery = query(collection(db, "users"), where("userName", "==", userName), where("password", "==", password))
    const docs = await getDocs(loginQuery)
    docs.forEach(doc => {
      setUser({ ...doc.data(), "id": doc.id })
      saveUser({ ...doc.data(), "id": doc.id })
      check = true;
      setIsLoading(false)
    });
    if (!check) {
      setError("Error: Wrong Credentials!!")
      setIsLoading(false)
    }
  };

  const onLogout = () => {
    setTimeout(() => {
      setUser(null);
      removeUser();
    }, 800)
  };

  const onRegister = async (userName, email, MobileNo, password, repeatedPassword) => {

    setIsLoading(true);

    let result = RegisterCheck(userName, email, MobileNo, password, repeatedPassword)

    /*firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });*/


    const usersRef = collection(db, "users")

    if (result === true) {
      const q = query(collection(db, "users"), where("userName", "==", userName))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        result = "Error: User Name already taken!!"
      })
    }

    if (result === true) {
      addDoc(usersRef, {
        userName: userName,
        email: email,
        mobileNo: MobileNo,
        password: password
      })
        .then(async (res) => {
          const docRef = doc(db, "users", res.id);
          const docRes = await getDoc(docRef);
          setUser({ ...docRes.data(), "id": res.id })
          saveUser({ ...docRes.data(), "id": res.id })
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false);
          console.log("Some error occured!! ", e)
          setError("Error: Some error occured!!")
        })
    }
    else {
      setIsLoading(false)
      setError(result)
    }
  }

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("@userLogin");
    } catch (e) {
      console.log("error occured while removing user ", e)
    }
  }

  const saveUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@userLogin", jsonValue);
    } catch (e) {
      console.log("error storing user info", e);
    }
  };

  const loadUser = async () => {
    setIsLogging(true)
    try {
      const value = await AsyncStorage.getItem("@userLogin");
      if (value !== null) {
        setUser(JSON.parse(value))
        setIsLogging(false)
      }
      setIsLogging(false)
    } catch (e) {
      console.log("error loading user info", e);
      setIsLogging(false)
    }
  };

  useEffect(() => {
    loadUser();
  }, [])

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
        setError,
        isLogging
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};