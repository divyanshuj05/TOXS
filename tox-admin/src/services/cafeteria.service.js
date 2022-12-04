import { db } from "../database.config"
import { storage } from "../database.config"
import { collection, query, where, getDocs, addDoc, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const CheckCafeteriaData = (name,location,vendor,img,openTime,closeTime,menuList) => {
    if(!name||!location||!img||!openTime||!closeTime||!menuList.length||!vendor)
    {
        alert("Fill information first!!")
        return false
    }
    const ext=img.type
    console.log("iweiuerb"+ext)
    // eslint-disable-next-line eqeqeq
    if(ext!="image/jpeg"&&ext!="image/png"&&ext!="image/jpg")
    {
        alert("Only .jpg, .jpeg, .png images are supported")
        return false
    }
    // eslint-disable-next-line eqeqeq
    if(openTime==closeTime)
    {
        alert("Opening and closing time are same!!")
        return false
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
            alert(`Cafeteria name "${name}" already exists!!`)
            reject("Cafeteria already exist")
            return
        }
        flag=0
        const Query=query(collection(db,"vendors"),where("userName","==",vendor))
        const ss = await getDocs(Query);
        ss.forEach(async(Doc) => {
            flag=1
            const vendorRef=doc(db,"vendors",Doc.id)
            await updateDoc(vendorRef,{
                restaurant:name
            })
        });
        if(flag===0)
        {
            alert(`Vendor "${vendor}" does not exist!!`)
            reject("Vendor does not exist")
            return
        }
        var imgRef = ref(storage,`restaurants/cafeteria icons/${name}`)
        var metadata = { contentType: img.type };
        await uploadBytesResumable(imgRef,img,metadata).then(async(res)=>{
            await getDownloadURL(res.ref).then((url)=>{
                URL=url;
                resolve("Done")
            }).catch(err=>{
                console.log(err)
                reject("Some error occured! Please try again")
                return
            })
        }).catch(err=>{
            console.log(err)
            reject("Some error occured! Please try again")
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
            reject("Problem registering cafeteria. Please try again")
            return
        })
    })
}   

export const AddFoodItems = (name,list) => {
    return new Promise (async(resolve,reject)=>{
        let flag=0
        const cafeteriaQuery=query(collection(db,"cafeterias"),where("Name","==",name))
        const querySnapshot = await getDocs(cafeteriaQuery);
        querySnapshot.forEach(async(Doc) => {
            flag=1
            const docRef=doc(db, "cafeterias", Doc.id);
            await updateDoc(docRef, {
                menuList:arrayUnion(...list)
            }).then((res)=>{  
              resolve("Done")
              return
            }).catch(err=>{
                console.log(err)
                alert("Some error occured! Please try again")
                reject(err)
                return
            });
        });
        if(flag===0)
        {
            alert(`Cafeteria name ${name} does not exists!!`)
            reject("Cafeteria does not exist")
            return
        }
    })
}