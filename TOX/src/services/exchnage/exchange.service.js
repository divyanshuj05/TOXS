import { collection, addDoc,query,where, getDocs, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db,storage } from "../../../database.config"
import { SendNotification } from "../common/notisFunctions.services";

export const StoreImage = async (image) => {
    let randomstring=require("randomstring")
    var name=randomstring.generate()
    const response = await fetch(image.uri)
    const blob = await response.blob();
    var imgRef = ref(storage,`exchanges/images/${name}`)
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

export const AddItem = (item,desc,price,category,url,name,email) => {
    let data={
        name:item,
        description:desc,
        cost:price,
        category:category,
        imageURL:url,
        seller:email,
        buyer:"null",
        status:"Available",
        imgName:name
    }

    const exchnageRef= collection(db, "exchanges")

    return new Promise(async (resolve,reject)=>{
        await addDoc(exchnageRef, data).then(res=>{
            resolve("Done with seller")
        }).catch(err=>{
            console.log(err)
            deleteObject(ref(storage,`exchanges/images/${imgName}`))
            reject("Some error occured! Please try again")
        });
    })
}

export const RetrieveData = (name) => {
    var array = []

    if (name === "Select All") {
        return new Promise(async (resolve, reject) => {
            const Query = query(collection(db, "exchanges"),where("status","==","Available"))
            const snapShot = await getDocs(Query)
            snapShot.forEach(doc => {
                let temp=Object.assign(doc.data(),{"id":doc.id})
                array.push(temp)
            });
            if (array == "[]") {
                reject("Problem getting data!!")
            }
            resolve(array);
        })
    }
    else {
        return new Promise(async (resolve, reject) => {
            const Query = query(collection(db, "exchanges"), where("category", "==", name), where("status","==","Available"))
            const snapShot = await getDocs(Query)
            snapShot.forEach(doc => {
                let temp=Object.assign(doc.data(),{"id":doc.id})
                array.push(temp)
            });
            if (array == "[]") {
                reject("Problem getting data!!")
            }
            resolve(array);
        });
    }
}

export const UpdateData = async (obj,status,mail) => {
    const docRef=doc(db,"exchanges",obj.id)
    delete obj.id
    if(status=="Available")
    {
        return new Promise(async(resolve,reject)=>{
            const newData={...obj,"status":status,"buyer":"null"}
            setDoc(docRef,newData).then(res=>{
                GetMobileData(obj.seller).then(res=>{
                    if(res.token!="null")
                    {
                        SendNotification(res.token,`Exchnage of ${obj.name}`,"Buyer has removed item from hold.")
                    }
                    resolve("Done")
                })
            }).catch(err=>{
                console.log(err)
                reject("Operatoin failed!! Please try again")
            })
        })
    }
    else if(status=="On Hold")
    {
        return new Promise(async(resolve,reject)=>{
            const newData={...obj,"status":status,"buyer":mail}
            setDoc(docRef,newData).then(res=>{
                GetMobileData(obj.seller).then(res=>{
                    if(res.token!="null")
                    {
                        SendNotification(res.token,`Exchnage of ${obj.name}`,"Someone has put your item on hold. Kindly contact the buyer")
                    }
                    resolve("Done")
                })
            }).catch(err=>{
                console.log(err)
                reject("Operatoin failed!! Please try again")
            })
        })
    }
    else{
        return new Promise(async(resolve,reject)=>{
            const newData={...obj,"status":status}
            setDoc(docRef,newData).then(res=>{
                resolve("Done")
            }).catch(err=>{
                console.log(err)
                reject("Operation failed!! Please try again")
            })
        })
    }
    
}

export const RetrieveHistory = (email) => {

    var array=[]

    return new Promise(async (resolve, reject) => {
        let Query = query(collection(db, "exchanges"), where("seller", "==" , email))
        let snapShot = await getDocs(Query)
        snapShot.forEach(doc => {
            let temp=Object.assign(doc.data(),{"id":doc.id})
            array.push(temp)
        });
        Query = query(collection(db, "exchanges"), where("buyer", "==" , email))
        snapShot = await getDocs(Query)
        snapShot.forEach(doc => {
            let temp=Object.assign(doc.data(),{"id":doc.id})
            array.push(temp)
        });
        if (array == "[]") {
            reject("Problem getting data!!")
        }
        resolve(array);
    });
}

export const GetMobileData = (email) => {
    return new Promise(async(resolve,reject)=>{
    const Query = query(collection(db, "users"), where("email", "==", email))
    const docs = await getDocs(Query)
    docs.forEach(doc => {
      resolve(doc.data())
    });
    reject("Operation failed!! Please try again")
    })
}