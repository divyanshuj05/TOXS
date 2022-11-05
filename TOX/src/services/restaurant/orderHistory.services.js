import { db } from "../../../database.config";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

export const GetOrders = (name,coll) => {
    var array=[]

    if(coll=="users")
    {
        return new Promise(async(resolve,reject)=>{
            let Query = query(collection(db, "cafeteriaOrders"), where("orderBy", "==" , name))
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
    else{
        return new Promise(async(resolve,reject)=>{
            let Query = query(collection(db, "cafeteriaOrders"), where("vendor", "==" , name))
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
}

export const OrderReadyStatus = (id) => {
    return new Promise(async(resolve,reject)=>{
        const orderRef=doc(db,"cafeteriaOrders",id)
        await updateDoc(orderRef,{
            "status":"Not Ready"
        }).then(res=>{
            resolve("Done")
        })
        .catch(e=>{
            console.log(e)
            reject("Some error occured")
        })
    })
}

export const GetNotiToken = (email) => {
    return new Promise(async(resolve,reject)=>{
    const Query = query(collection(db, "users"), where("email", "==", email))
    const docs = await getDocs(Query)
    docs.forEach(doc => {
      resolve(doc.data().token)
    });
    reject("Operation failed!! Please try again")
    })
}