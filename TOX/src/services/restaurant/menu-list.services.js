import React from "react"
import { db } from "../../../database.config"
import { collection, getDocs, query, where } from "firebase/firestore";

export const MenuListServices = (name) => {
    var array = []
    return new Promise(async (resolve, reject) => {
        const cafeRef = collection(db, "cafeterias")
        const Query = query(cafeRef, where("Name", "==", name))
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