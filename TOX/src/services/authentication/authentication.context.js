import React, { useState, createContext, useEffect } from "react";
import { registerForPushNotificationsAsync, SendNotification } from "../common/notisFunctions.services";
import { loginCheck, RegisterCheck, ForgotPasswordCheck, StoreUserImage, RemoveStoredImage } from "./authentication.services";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, addDoc, doc, getDoc, getDocs, query, where, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../database.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
const randomstring=require("randomstring")

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

  const deliveryLogin = async(cafeteria,key) => {
    setIsLoading(true)
    if(cafeteria==null||cafeteria=="")
    {
      setError("Error: Cafeteria feild empty")
      setIsLoading(false)
      return
    }
    if(key==null||key=="")
    {
      setError("Error: Security key not filled")
      setIsLoading(false)
      return
    }
    let flag=0
    const Query=query(collection(db,"vendors"),where("restaurant","==",cafeteria),where("securityKey","==",key))
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach(doc => {
      flag=1
      setUser(null)
      const userData={
        "type":"delivery",
        "cafteria":doc.data().restaurant,
        "userName":doc.data().userName
      }
      setUser(userData)
      saveUser(userData)
      setIsLoading(false)
      return
    })
    if(flag===0)
    { 
      setIsLoading(false)
      setError("Error: Wrong credentails")
    }
  }

  const ForgotPassword = async(name,Coll,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo) =>{
    setIsLoading(true)
    const res=ForgotPasswordCheck(name,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo)
    if(res!=true)
    {
      setIsLoading(false)
      return res
    }
    var flag=false
    const S1=securityQuestionOne+" "+securityOne
    const S2=securityQuestionTwo+" "+securityTwo
    const userQuery = query(collection(db, Coll), where("userName", "==", name), where("securityOne","==",S1), where("securityTwo","==",S2))
    const docs=await getDocs(userQuery)
    docs.forEach(async(Doc)=>{
      flag=true
      const token=await registerForPushNotificationsAsync()
      if(token==undefined||token==null)
      {
        setIsLoading(false)
        return "Error"
      }
      const forgotRef=doc(db,Coll,Doc.id)
      const tempPassword=randomstring.generate(5)
      await updateDoc(forgotRef,{
        password:tempPassword
      }).then(res=>{
        SendNotification(token,"Password change request",`Your password is: ${tempPassword}`)
        setIsLoading(false)
        return null
      }).catch(e=>{
        setIsLoading(false)
        return "Error: Cannot set password. Please try again"
      })
    })
    if(flag===false)
    {
      setIsLoading(false)
      return `Error: User with these credentials does not exist!!`
    }
  }

  const onLogout = () => {
    Alert.alert(
      "Sure want to logout?",
      "Some features may not perist between logins",
      [

          {
              text: "Yes",
              onPress: () => {
                if(user.type=="delivery")
                {}else{
                  const userRef=doc(db,user.type,user.id)
                  updateDoc(userRef,{"token":"null"})
                }
                setUser(null);
                removeUser();
              }
          },
          {
            text: "No",
            onPress: () => { return }
          }
      ]
      )
  };

  const onRegister = async (userName, email, MobileNo,mobileDisplay, password,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo) => {

    setIsLoading(true);

    let result = RegisterCheck(userName, email, MobileNo,mobileDisplay, password,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo)

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
        result = "Error: User Name already exists!!"
      })
    }

    if(result===true)
    {
      const q = query(collection(db, "users"), where("email", "==", email))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        result = "Error: E-Mail already exists!!"
      })
    }

    if (result === true) {
      let token=await registerForPushNotificationsAsync()
      addDoc(usersRef, {
        userName: userName,
        email: email,
        mobileNo: MobileNo,
        mobileDisplay:mobileDisplay,
        password: password,
        token:token,
        securityOne:securityQuestionOne+" "+securityOne,
        securityTwo:securityQuestionTwo+" "+securityTwo,
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

    if(field=="mobileDisplay")
    {
      const data = { ...user, mobileDisplay: newFieldVal }
      delete data.id;
      delete data.type
      const docRef = doc(db, Coll, user.id)

      setDoc(docRef, data, { merge: true })
        .then(res => {
          setUser({ ...user, mobileDisplay: newFieldVal,type:Coll })
          removeUser()
          saveUser({ ...user, mobileDisplay: newFieldVal,type:Coll })
          setIsLoading(false)
          return
        })
        .catch(error => {
          setIsLoading(false)
          console.log(error);
          return
        })
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

  const SaveUserImage = (image) => {
    if(image==""||image==null||image==undefined)
    {
      alert("Some error occured! Please try again")
      return
    }
    setIsLoading(true)
    if(user.photo=="null"||user.photo==undefined)
    {}
    else{
      const res=RemoveUserImage()
      if(res===false)
      {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
    }
    StoreUserImage(image).then(async(res)=>{
      const {url,imgName}=res
      const userRef=doc(db,user.type,user.id)
      await updateDoc(userRef,{
        photo:url,
        imgName:imgName
      }).then(res=>{
          setUser({ ...user, photo: url,imgName:imgName })
          removeUser()
          saveUser({ ...user, photo: url,imgName:imgName })
          setIsLoading(false)
          return
      }).catch(e=>{
        setIsLoading(false)
        alert("Some error occured!!")
        return
      })
    }).catch(e=>{
      setIsLoading(false)
      alert(e)
      return
    })
  }

  const RemoveUserImage = () => {
    setIsLoading(true)
    RemoveStoredImage(user.imgName).then(async(res)=>{
      const userRef=doc(db,user.type,user.id)
      await updateDoc(userRef,{
        photo:"null",
        imgName:"null"
      }).then(res=>{
          setUser({ ...user, photo: "null",imgName:"null" })
          removeUser()
          saveUser({ ...user, photo: "null",imgName:"null" })
          setIsLoading(false)
          return true
      }).catch(e=>{
        setIsLoading(false)
        alert("Some error occured!!")
        return false
      })
    }).catch(e=>{
      setIsLoading(false)
      return false
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
        ForgotPassword,
        SaveUserImage,
        RemoveUserImage,
        deliveryLogin
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};