import { collection, addDoc,query,where, getDocs, setDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    const time=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    today = yyyy + '-' + mm + '-' + dd;

    let data={
        name:item,
        description:desc,
        cost:price,
        category:category,
        imageURL:url,
        seller:email,
        buyers:[],
        status:"Available",
        imgName:name,
        postDate:today,
        postTime:time
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

export const RetrieveData = () => {
    var array = []
    return new Promise(async (resolve, reject) => {
        let Query = query(collection(db, "exchanges"),where("status","in",["Available","On Hold"]))
        let snapShot = await getDocs(Query)
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

export const UpdateData = async (obj,status,soldTo,mail) => {
    const docRef=doc(db,"exchanges",obj.id)
    delete obj.id
    if(status=="Available")
    {
        return new Promise(async(resolve,reject)=>{
            const stat=obj.buyers.length==1?"Available":"On Hold"
            updateDoc(docRef,{
                "status":stat,
                "buyers":arrayRemove(mail)
            }).then(res=>{
                GetMobileData(obj.seller).then(res=>{
                    if(res.token!="null")
                    {
                        SendNotification(res.token,`Exchnage of ${obj.name}`,"A Buyer has removed item from hold.")
                    }
                    resolve("Done")
                })
            }).catch(err=>{
                console.log(err)
                reject("Operation failed!! Please try again")
            })
        })
    }
    else if(status=="On Hold")
    {
        return new Promise(async(resolve,reject)=>{
            updateDoc(docRef,{
                "status":status,
                "buyers":arrayUnion(mail)
            }).then(res=>{
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
    else if(status=="Sold"){
        return new Promise(async(resolve,reject)=>{
            updateDoc(docRef,{
                "status":status,
                "buyer":soldTo
            }).then(res=>{
                resolve("Done")
                return
            }).catch(err=>{
                console.log(err)
                reject("Operation failed!! Please try again")
            })
        })
    }
    else{
        return new Promise(async(resolve,reject)=>{
            updateDoc(docRef,{
                "status":status
            }).then(res=>{
                resolve("Done")
                return
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
        Query = query(collection(db, "exchanges"), where("buyers", "array-contains" , email))
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