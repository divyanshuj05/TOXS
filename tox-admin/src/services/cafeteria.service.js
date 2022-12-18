import { db } from "../database.config"
import { storage } from "../database.config"
import { collection, query, where, getDocs, addDoc, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const CheckCafeteriaData = (name,location,vendor,img,openTime,closeTime,menuList) => {
    if(!name||!location||!img||!openTime||!closeTime||!menuList.length||!vendor)
    {
        return ("Fill information first!!")
    }
    const ext=img.type
    // eslint-disable-next-line eqeqeq
    if(ext!="image/jpeg"&&ext!="image/png"&&ext!="image/jpg")
    {
        return("Only .jpg, .jpeg, .png images are supported")
    }
    // eslint-disable-next-line eqeqeq
    if(openTime==closeTime)
    {
        return("Opening and closing time are same!!")
    }

    return true
}

export const RegisterCafeteria = (name,location,vendor,img,openTime,closeTime,menuList) => {

    return new Promise(async(resolve,reject)=>{
        var flag=0;
        var URL=null;
        const cafeteriaQuery=query(collection(db,"cafeterias"),where("Name","==",name))
        const querySnapshot = await getDocs(cafeteriaQuery);
        querySnapshot.forEach(doc => {
            flag=1
        });
        if(flag===1)
        {
            reject(`Cafeteria name "${name}" already exists!!`)
            return
        }
        const Query=query(collection(db,"vendors"),where("userName","==",vendor))
        const ss = await getDocs(Query);
        ss.forEach(async(Doc) => {
            const vendorRef=doc(db,"vendors",Doc.id)
            await updateDoc(vendorRef,{
                restaurant:name
            })
        });
        var imgRef = ref(storage,`restaurants/cafeteria icons/${name}`)
        var metadata = { contentType: img.type };
        await uploadBytesResumable(imgRef,img,metadata).then(async(res)=>{
            await getDownloadURL(res.ref).then((url)=>{
                URL=url;
                resolve("Done")
            }).catch(err=>{
                console.log(err)
                reject("Some error occured in stroing image! Please try again")
                return
            })
        }).catch(err=>{
            console.log(err)
            reject("Some error occured in stroing image! Please try again")
            return
        })
        let data={
            Name:name,
            address:location,
            icon:URL,
            menuList:menuList,
            timings:openTime+":00-"+closeTime+":00",
            vendor:vendor
        }
        await addDoc(collection(db,"cafeterias"),data).then(res=>{
            resolve("Cafeteria successfully registered")
            return
        }).catch(e=>{
            reject("Some error occured in registering cafeteria! Please try again")
            return
        })
    })
}   

export const GetAllVendors = () => {
    return new Promise(async(resolve,reject)=>{
        let array=[]
        const Query=query(collection(db,"vendors"),where("restaurant","==","null"))
        const querySnapshot = await getDocs(Query);
        querySnapshot.forEach((Doc)=>{
            array.push(Doc.data().userName)
        })
        resolve(array)
    })
}

export const GettAllCafeterias = () => {
    return new Promise(async(resolve,reject)=>{
        let array=[]
        const Query=query(collection(db,"cafeterias"))
        const querySnapshot = await getDocs(Query);
        querySnapshot.forEach((Doc)=>{
            array.push(Doc.data().Name)
        })
        resolve(array)
    })
}

export const AddFoodItems = (name,list) => {
    return new Promise (async(resolve,reject)=>{
        const cafeteriaQuery=query(collection(db,"cafeterias"),where("Name","==",name))
        const querySnapshot = await getDocs(cafeteriaQuery);
        querySnapshot.forEach(async(Doc) => {
            const docRef=doc(db, "cafeterias", Doc.id);
            await updateDoc(docRef, {
                menuList:arrayUnion(...list)
            }).then((res)=>{  
              resolve("Done")
              return
            }).catch(err=>{
                console.log(err)
                reject("Some error occured! Please try again")
                return
            });
        });
    })
}