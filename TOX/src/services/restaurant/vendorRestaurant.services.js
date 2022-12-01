import { db } from "../../../database.config"
import { collection, getDoc, query, getDocs, where, arrayUnion, doc, arrayRemove, updateDoc } from "firebase/firestore";

export const VendorRestaurantsRequest = (Name) => {

    var array = []

    return new Promise(async (resolve, reject) => {
        const Query = query(collection(db, "cafeterias"), where("vendor", "==", Name))
        const snapShot = await getDocs(Query)
        snapShot.forEach(doc => {
            array.push(doc.data())
        });
        if (array == "[]") {
            reject("Problem getting data!!")
        }
        resolve(array);
    });
    
}

export const AddFoodItem = async (Title,cost,type,Restaurant) => {
    return new Promise(async (resolve,reject)=>{
        let data={
            price:cost,
            title:Title,
            type:type
        }
        const Query = query(collection(db, "cafeterias"), where("Name", "==", Restaurant))
        const docs = await getDocs(Query)
        docs.forEach(async (Doc)=>{
            const docRef=doc(db, "cafeterias", Doc.id);
            await updateDoc(docRef, {
                menuList:arrayUnion(data)
            }).then((res)=>{
              resolve("Done")  
            }).catch(err=>{reject(err)});
        })
    })
}

export const EditFoodItem = async (Title,oldCost,type,newCost,restaurant) => {
    return new Promise(async (resolve,reject)=>{
        let oldData={
            price:oldCost,
            title:Title,
            type:type
        }
        let newData={
            price:newCost,
            title:Title,
            type:type
        }
        const Query = query(collection(db, "cafeterias"), where("Name", "==", restaurant))
        const docs = await getDocs(Query)
        docs.forEach(async (Doc)=>{
            const docRef=doc(db, "cafeterias", Doc.id);
            await updateDoc(docRef, {
                menuList:arrayRemove(oldData)
            }).then(async (res)=>{
                await updateDoc(docRef,{
                    menuList: arrayUnion(newData)
                }).then((res)=>resolve("Done")).catch(err=>reject("Operation Failed!! Please try again"))
            })
            .catch(err=>{reject("Operation Failed!! Please try again"),console.log(err)});
        })
    })
}

export const DeleteFoodItem = (Title,cost,type,restaurant) => {
    return new Promise(async (resolve,reject)=>{
        let data={
            price:cost,
            title:Title,
            type:type
        }
        const Query = query(collection(db, "cafeterias"), where("Name", "==", restaurant))
        const docs = await getDocs(Query)
        docs.forEach(async (Doc)=>{
            const docRef=doc(db, "cafeterias", Doc.id);
            await updateDoc(docRef, {
                menuList:arrayRemove(data)
            }).then((res)=>{
              resolve("Done")  
            }).catch(err=>{reject(err)});
        })
    })
}