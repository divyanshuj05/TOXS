import { db } from "../database.config"
import { addDoc,query,where,collection,getDocs,doc,updateDoc } from "firebase/firestore"

export const CheckVendorData = (name,email,mobile,password,cafe) => {
    if(!name||!email||!mobile||!password||!cafe)
    {
        alert("Fill information first!!")
        return false
    }
    if(email.includes("@gmail.com") === false) {
        if(email.includes("@thapar.edu") === false) {
            if(email.includes("@outlook.com") === false) {
                alert("Error: E Mail format not correct/not supported!!")
                return false
            }
        }
    }
    console.log(mobile)
    for(let i=0;i<mobile.length;i++)
    {
        console.log(mobile[i])
        if(isNaN(mobile[i]))
        {
            console.log(isNaN(mobile[i]))
            alert("Mobile Number should contain only numbers")
            return false
        }
    }
    // eslint-disable-next-line eqeqeq
    if(mobile.length!=10)
    {
        alert("Length of mobile number should be 10")
        return false
    }

    if (password.match(/[A-Z]/g) != null) {
        if (password.match(/[a-z]/g) != null) {
          if (password.match(/[0-9]/g) != null) {
            if (password.length >= 8) { }
            else {
              alert( "Error: Length of password should be greater than or equal to 8!!");
              return false
            }
          }
          else {
            alert("Error: Password should contain atleast one number!!");
            return false
          }
        }
        else {
           alert("Error: Password should contain atleast one lowercase letter!!");
           return false
        }
      }
      else {
        alert("Error: Password should contain atleast one uppercase letter!!");
        return false
      }
      return true
}

export const EnterVendorData = (name,email,mobile,password,cafe) => {
  return new Promise(async(resolve,reject)=>{
    var flag=0;
    const cafeteriaQuery=query(collection(db,"cafeterias"),where("Name","==",cafe))
    const querySnapshot = await getDocs(cafeteriaQuery);
    querySnapshot.forEach(async(Doc) => {
      flag=1
      const ref=doc(db,"cafeterias",Doc.id)
      await updateDoc(ref, {
        "vendor": name
      });
    });
    if(flag===0)
    {
      alert("Cafteria does not exist!!")
      reject("Cafeteria does not exist")
      return
    }
    let data={
      userName:name,
      email:email,
      mobileNo:mobile,
      password:password,
      restaurant:cafe,
      token:"null"
    }
    await addDoc(collection(db,"vendors"),data).then(res=>{
      resolve("Vendor successfully registered")
      return
    }).catch(e=>{
      reject("Problem registering vendor. Please try again")
      return
    })
  })
}