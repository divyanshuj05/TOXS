import React, { useState, createContext, useEffect } from "react";
import { registerForPushNotificationsAsync } from "../common/notisFunctions.services";
import { loginCheck, RegisterCheck } from "./authentication.services";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, addDoc, doc, getDoc, getDocs, query, where, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../database.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLogging, setIsLogging] = useState(true)

  if(error)
  {
    setTimeout(()=>{
      setError(null)
    },5000)
  }

  /*firebase.auth().onAuthStateChanged((u) => {
    if (u) {
      setUser(u);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });*/

  const onLogin = async (userName, password,Coll) => {
    let check = false;
    setIsLoading(true);

    const result = loginCheck(userName, password)
    if (result != true) {
      setError(result)
      setIsLoading(false)
      return
    }

    const loginQuery = query(collection(db, Coll), where("userName", "==", userName), where("password", "==", password))
    const docs = await getDocs(loginQuery)
    docs.forEach(async(Doc) => {
      check=true
      var token=await registerForPushNotificationsAsync()
      let ID=Doc.id
      const userRef=doc(db,Coll,ID)
      await updateDoc(userRef,{"token":token})
      
      setUser({ ...Doc.data(), "id": Doc.id, "type": Coll,"token":token })
      saveUser({ ...Doc.data(), "id": Doc.id, "type": Coll,"token":token })
      setIsLoading(false)
    });
    if (!check) {
      setError("Error: Wrong Credentials!!")
      setIsLoading(false)
    }
  };

  const onLogout = () => {
    Alert.alert(
      "Sure want to logout?",
      "Some features may not perist between logins",
      [

          {
              text: "Yes",
              onPress: () => {
                setTimeout(() => {
                  const userRef=doc(db,user.type,user.id)
                  updateDoc(userRef,{"token":"null"})
                  setUser(null);
                  removeUser();
                }, 400)
              }
          },
          {
            text: "No",
            onPress: () => { return }
          }
      ]
      )
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

    if(result===true)
    {
      const q = query(collection(db, "users"), where("email", "==", email))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        result = "Error: Email already taken!!"
      })
    }

    if (result === true) {
      let token=await registerForPushNotificationsAsync()
      addDoc(usersRef, {
        userName: userName,
        email: email,
        mobileNo: MobileNo,
        password: password,
        token:token
      })
        .then(async (res) => {
          const docRef = doc(db, "users", res.id);
          const docRes = await getDoc(docRef);
          setUser({ ...docRes.data(), "id": res.id, "type": "users" })
          saveUser({ ...docRes.data(), "id": res.id, "type": "users" })
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

  const UpdateDoc = (field, newFieldVal,Coll) => {
    setIsLoading(true)
    if (newFieldVal == "") {
      setIsLoading(false)
      return true;
    }

    if (field === "mobileNo") {
      if (user.mobileNo == newFieldVal) {
        setIsLoading(false)
        return true
      }
      for (let i = 0; i < newFieldVal.length; i++) {
        if (newFieldVal[i].match(/[0-9]/g) == null) {
          setIsLoading(false)
          return "Error: Mobile Number should contain only numbers!!"
        }
      }
      if (newFieldVal.length !== 10) {
        return "Error: Mobile Number length should be 10!!";
      }

      const data = { ...user, mobileNo: newFieldVal }
      delete data.id
      delete data.type
      const docRef = doc(db, Coll, user.id)

      setDoc(docRef, data)
        .then(res => {
          setUser({ ...user, mobileNo: newFieldVal,type:Coll })
          removeUser()
          saveUser({ ...user, mobileNo: newFieldVal,type:Coll })
          setIsLoading(false)
          return true
        })
        .catch(error => {
          setIsLoading(false)
          console.log(error);
          return error
        })

      return true
    }

    if (field == "password") {
      if (user.password == newFieldVal) {
        setIsLoading(false)
        return true
      }
      if (newFieldVal.match(/[A-Z]/g) != null) {
        if (newFieldVal.match(/[a-z]/g) != null) {
          if (newFieldVal.match(/[0-9]/g) != null) {
            if (newFieldVal.length >= 8) { }
            else {
              setIsLoading(false)
              return "Error: Length of password should be greater than or equal to 8!!";
            }
          }
          else {
            setIsLoading(false)
            return "Error: Password should contain atleast one number!!";
          }
        }
        else {
          setIsLoading(false)
          return "Error: Password should contain atleast one lowercase letter!!";
        }
      }
      else {
        setIsLoading(false)
        return "Error: Password should contain atleast one uppercase letter!!";
      }
      const data = { ...user, password: newFieldVal }
      delete data.id;
      delete data.type
      const docRef = doc(db, Coll, user.id)

      setDoc(docRef, data, { merge: true })
        .then(res => {
          setUser({ ...user, password: newFieldVal,type:Coll })
          removeUser()
          saveUser({ ...user, password: newFieldVal,type:Coll })
          setIsLoading(false)
          return true
        })
        .catch(error => {
          setIsLoading(false)
          console.log(error);
          return error
        })

      return true
    }

    if (field == "userName") {
      if (user.userName == newFieldVal) {
        setIsLoading(false)
        return true;
      }
      if (newFieldVal.length <= 4) {
        setIsLoading(false);
        return "Error: Length of your User Name should be greater than or equal to 5!!"
      }
      if (CheckUser(newFieldVal,Coll) === true) {

        setIsLoading(false)
        return "Error: User Name already taken!!"
      }

      const data = { ...user, userName: newFieldVal }
      delete data.id
      delete data.type
      const docRef = doc(db, Coll, user.id)

      setDoc(docRef, data)
        .then(res => {
          setUser({ ...user, userName: newFieldVal,type:Coll })
          removeUser()
          saveUser({ ...user, userName: newFieldVal,type:Coll })
          setIsLoading(false)
          return true
        })
        .catch(error => {
          setIsLoading(false)
          console.log(error);
          return error
        })

      return true
    }
  }

  const CheckUser = async (u,Coll) => {
    const q = query(collection(db, Coll), where("userName", "==", u));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      return true
    })
    return false;
  }

  const removeDoc = (Coll) => {
    const docRef = doc(db, "users", user.id)
    deleteDoc(docRef)
      .then(() => {
        removeUser()
        setUser(null)
      })
      .catch(error => {
        console.log(error);
      })
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
        isLogging,
        UpdateDoc,
        removeDoc
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};