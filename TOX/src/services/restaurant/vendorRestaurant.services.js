import { db } from "../../../database.config"
import { collection, getDocs, query, where } from "firebase/firestore";

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