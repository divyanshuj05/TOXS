import { db } from "../../../database.config"
import { collection, getDocs, query, where } from "firebase/firestore";

export const restaurantsRequest = (Name) => {

    var array = []

    if (Name === "Select All") {
        return new Promise(async (resolve, reject) => {
            const Query = collection(db, "cafeterias")
            const snapShot = await getDocs(Query)
            snapShot.forEach(doc => {
                array.push(doc.data())
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
                array.push(doc.data())
            });
            if (array == "[]") {
                reject("Problem getting data!!")
            }
            resolve(array);
        });
    }
}