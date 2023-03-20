
import { initializeApp } from "firebase/app";
import {getFireStore, collection, doc, getDocs, query, where} from "./firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyBMQx9Pan_EZ4iqzkXIQkU1q5FWD4HqzFg",
  authDomain: "van-life-3cd59.firebaseapp.com",
  projectId: "van-life-3cd59",
  storageBucket: "van-life-3cd59.appspot.com",
  messagingSenderId: "817318264735",
  appId: "1:817318264735:web:e08b47719aa750ee1507aa"
};

const app = initializeApp(firebaseConfig);
const db = getFireStore(app)

const vansCollectionRef = collection()

export async function getAllVans(){
    const querSnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

export async function getVan(id){
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDocs(docRef)
    return {
        ...vanSnapshot,
        id: vanSnapshot.id
    }
}

export async function getHostVans(){
    const q = query(vansCollectionRef, where("hostId,", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id:doc.id
    }))
    return dataArr
}

