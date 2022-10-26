import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import { db,storage } from "../../../database.config"

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
                resolve(url)
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

export const AddItem = async (item,desc,price,category,url,email) => {
    let data={
        name:item,
        description:desc,
        cost:price,
        category:category,
        imageURL:url,
        seller:email,
        buyer:"null",
        status:"Available"
    }

    const exchnageRef= collection(db, "exchanges")

    return new Promise(async (resolve,reject)=>{
        await addDoc(exchnageRef, data).then(res=>{
            resolve("Done with seller")
        }).catch(err=>{
            console.log(err)
            reject("Some error occured! Please try again")
        });
    })
}