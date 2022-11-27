import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { storage } from '../../../database.config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const loginCheck = (userName, password) => {
  if (userName === "") {
    return "Error: User field empty!!";
  }

  if (password === "") {
    return "Error: Password field empty!!";
  }

  return true
}

export const RegisterCheck = (userName, email, MobileNo, password,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo) => {

  if (userName === "") {
    return "Error: User field empty!!";
  }

  if (userName.length <= 4) {
    return "Error: Length of your User Name should be greater than or equal to 5!!"
  }

  if (email === "") {
    return "Error: E-Mail field empty!!";
  }
  else {
    if (email.includes("@gmail.com") === false) {
      if (email.includes("@thapar.edu") === false) {
        if (email.includes("@outlook.com") === false) {
          return "Error: E Mail format not correct/not supported!!";
        }
      }
    }
  }

  if (MobileNo == "") {
    return "Error: Mobile number field empty!!";
  }

  for (let i = 0; i < MobileNo.length; i++) {
    if (MobileNo[i].match(/[0-9]/g) == null) {
      return "Mobile Number should contain only numbers!!"
    }
  }

  if (MobileNo.length !== 10) {
    return "Error: Mobile Number length should be 10!!";
  }

  if (password === "") {
    return "Error: Password field is empty!!";
  }

  if (password.match(/[A-Z]/g) != null) {
    if (password.match(/[a-z]/g) != null) {
      if (password.match(/[0-9]/g) != null) {
        if (password.length >= 8) { }
        else {
          return "Error: Length of password should be greater than or equal to 8!!";
        }
      }
      else {
        return "Error: Password should contain atleast one number!!";
      }
    }
    else {
      return "Error: Password should contain atleast one lowercase letter!!";
    }
  }
  else {
    return "Error: Password should contain atleast one uppercase letter!!";
  }

  if(securityQuestionOne==""||securityQuestionOne==null||securityQuestionOne==undefined)
  {
    return "Error: Security Question 1 not filled!!"
  }

  if(securityQuestionTwo==""||securityQuestionTwo==null||securityQuestionTwo==undefined)
  {
    return "Error: Security Question 2 not filled!!"
  }

  if(securityQuestionOne==securityQuestionTwo)
  {
    return "Error: Security Questions need to be different!!"
  }

  if(securityOne==""||securityOne==null||securityOne==undefined)
  {
    return "Error: Answer of security question 1 not filled!!"
  }

  if(securityTwo==""||securityTwo==null||securityTwo==undefined)
  {
    return "Error: Answer of security question 2 not filled!!"
  }

  return true;

}

export const ForgotPasswordCheck = (userName,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo) => {

  if (userName == ""||userName==undefined||userName==null) {
    return "Error: User field empty!!";
  }

  if(securityQuestionOne==""||securityQuestionOne==null||securityQuestionOne==undefined)
  {
    return "Error: Security Question 1 not filled!!"
  }

  if(securityQuestionTwo==""||securityQuestionTwo==null||securityQuestionTwo==undefined)
  {
    return "Error: Security Question 2 not filled!!"
  }

  if(securityOne==""||securityOne==null||securityOne==undefined)
  {
    return "Error: Answer of security question 1 not filled!!"
  }

  if(securityTwo==""||securityTwo==null||securityTwo==undefined)
  {
    return "Error: Answer of security question 2 not filled!!"
  }

  return true
}

export const StoreUserImage = async(image) => {
    let randomstring=require("randomstring")
    var name=randomstring.generate(7)
    const response = await fetch(image.uri)
    const blob = await response.blob();
    var imgRef = ref(storage,`users/profile images/${name}`)
    var metadata = { contentType: 'image/jpeg', };
    return new Promise(async(resolve,reject)=>{
        await uploadBytes(imgRef,blob,metadata).then(res=>{
            getDownloadURL(res.ref).then((url)=>{
                let response={
                    url:url,
                    imgName:name
                }
                resolve(response)
            }).catch(err=>{
                console.log(err)
                reject("Some error occured! Please try again")
            })
        }).catch(err=>{
            console.log(err)
            reject("Some error occured! Please try again")
        })  
    })
}

export const RemoveStoredImage = (imgName) => {
  const imgRef = ref(storage, `users/profile images/${imgName}`);
  return new Promise(async(resolve,reject)=>{
    deleteObject(imgRef).then((res) => {
      resolve("Done")
      return
    }).catch((error) => {
      console.log(error)
      alert("Some error occured! Please try again")
      reject("Fail")
      return
    });
  })
} 