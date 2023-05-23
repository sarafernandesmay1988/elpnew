import React,{useState, useEffect} from 'react'
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";
  import { db, auth, storage } from "../config/config";

const useFetchHolidays = () => {
    const [userData, setuserData] = useState([])
    const userCollection = collection(db, "users");
    const userdata = JSON.parse(localStorage.getItem('userdata'));

    const getHolidays = async () => {
     
        try {
          const data = await getDocs(userCollection);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          if(userdata.email !== 'admin@iws.in'){
            const finaldata= filteredData.filter((f) => f.emailid === userdata.email)
            setuserData(finaldata)
            localStorage.setItem('holidays', finaldata);
          } else {
            setuserData(filteredData)
            localStorage.setItem('holidays', filteredData);

          }
          
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(() => {
        getHolidays();
      },[])
  return [userData];
}

export default useFetchHolidays