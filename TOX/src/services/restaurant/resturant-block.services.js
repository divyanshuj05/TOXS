import { db } from "../../../database.config"
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

export const restaurantsRequest = (Name) => {

    var array = []

    if (Name === "Select All") {
        return new Promise(async (resolve, reject) => {
            const Query = collection(db, "cafeterias")
            const snapShot = await getDocs(Query)
            snapShot.forEach(doc => {
                if(doc.data().timings)
                {
                    let openingTime=doc.data().timings.substring(0,8)
                    let closingTime=doc.data().timings.substring(9,17)
                    let dateRef=new Date()
                    let currentTime=dateRef.toLocaleTimeString('en-us',{hour12:false})
                    if(openingTime<=currentTime&&closingTime>currentTime)
                    {
                        let temp=Object.assign(doc.data(),{"isOpen":"true"}) 
                        array.push(temp)
                    }
                    else{
                        let temp=Object.assign(doc.data(),{"isOpen":"false"}) 
                        array.push(temp)
                    }
                }
                else{
                array.push(doc.data())}
            });
            if (array == "[]") {
                reject("Problem getting data!!")
            }
            resolve(array);
        })
    }
    else {
        return new Promise(async (resolve, reject) => {
            const Query = query(collection(db, "cafeterias"), where("address", "==", Name))
            const snapShot = await getDocs(Query)
            snapShot.forEach(doc => {
                if(doc.data().timings)
                {
                    let openingTime=doc.data().timings.substring(0,8)
                    let closingTime=doc.data().timings.substring(9,17)
                    let dateRef=new Date()
                    let currentTime=dateRef.toLocaleTimeString('en-us',{hour12:false})
                    if(openingTime<=currentTime&&closingTime>currentTime)
                    {
                        let temp=Object.assign(doc.data(),{"isOpen":"true"}) 
                        array.push(temp)   
                    }
                    else{
                        let temp=Object.assign(doc.data(),{"isOpen":"false"}) 
                        array.push(temp)
                    }
                } else{
                array.push(doc.data())}
            });
            if (array == "[]") {
                reject("Problem getting data!!")
            }
            resolve(array);
        });
    }
}

export const Orders = (email,amount,vendor,data,restaurant) => {
    var data={
        orderBy:email,
        vendor:vendor,
        amount:amount,
        order:data,
        status:"Not Ready",
        paymentType:"Card",
        restaurant:restaurant
    }
    
    return new Promise(async(resolve,reject)=>{
        const orderRef=collection(db,"cafeteriaOrders")
        await addDoc(orderRef,data).then(res=>{
            resolve("Done")
        }).catch(e=>{
            console.log(e)
            reject("Some error occured")
        })
    })
}

export const SendVendorNoti = (name) => {
    return new Promise(async(resolve,reject)=>{
        const Query = query(collection(db, "vendors"), where("userName", "==", name))
        const docs = await getDocs(Query)
        docs.forEach(doc => {
          resolve(doc.data().token)
        });
        reject("Operation failed!! Please try again")
        })
} 