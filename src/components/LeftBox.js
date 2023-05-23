import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import Form from "../components/Form"
import List from "./List";
import useFetchHolidays from "../customHooks/useFetchHolidays";
import { db, auth, storage } from "../config/config";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
const LeftBox = () => {
    const [open, setOpen] = useState(false)
    const holidays = useFetchHolidays();
    const [userData, setuserData] = useState([])
  const userCollection = collection(db, "users");
  const [email, setemail] = useState('')
  const [name, setname] = useState('')
    const deleteHoliday = async (id) => {
      const movieDoc = doc(db, "users", id);
      await deleteDoc(movieDoc);
      getHolidays();
    };
    const getHolidays = async () => {
      try {
        const data = await getDocs(userCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("f",filteredData)
          const finaldata= filteredData.filter((f) => f.emailid == email)
        setuserData(finaldata)
        console.log(1111,finaldata)
        localStorage.setItem('holidays',  JSON.stringify(finaldata));
      } catch (err) {
        console.error(err);
      }
    };

 useEffect(() =>{
    const items = JSON.parse(localStorage.getItem('userdata'));
    setemail(items.email)
    setname(items.displayName)
  },[])

  const callme = () => {
console.log(33434)
  
  };
    useEffect(() => {
      getHolidays();
    },[email])
  return (
    <div className='leftbox-parent'>
<button className='button-85'
onClick={() => setOpen(!open)}>Add New</button>

{
    open &&

<Form getHolidays={getHolidays} deleteHoliday={deleteHoliday}/>
}
<List userData={userData} deleteHoliday={deleteHoliday}
callHoliday={holidays}
/>

    </div>
  )
}

export default LeftBox