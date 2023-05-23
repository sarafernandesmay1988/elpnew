import React,{useState, useEffect} from 'react'
import { useFormik } from 'formik';
import "./addForm.css"
import { db, auth, storage } from "../../config/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";


const AddForm = () => {
    const userCollection = collection(db, "userData");
const [status, setStatus]= useState(false)
const [erMsg, setErrmsg]= useState([])
const auth = getAuth();
const user = auth.currentUser;

console.log("user", user)
 function validateEmail(value) {
   let error;
   if (!value) {
     error = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
     error = 'Invalid email address';
   }
   return error;
 }
 const formik = useFormik({
    initialValues: {
        name:'',
      email: '',
      password:'',
    }, 
    onSubmit: values => {
      setErrmsg()
      createUserWithEmailAndPassword(auth, 
        values.email, values.password, values.name
        )
      .then((userCredential) => {
        const user = userCredential.user;
             updateProfile(user, {
              displayName: values.name,
            });
        if(userCredential.user)
        {
          setStatus(true)
        }
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
    const errorMessage = error.message;
    setErrmsg(errorCode)

      });
        // postData(values)
    //   alert(JSON.stringify(values, null, 2));
    },
  });
 function validateUsername(value) {
   let error;
   if (value === 'admin') {
     error = 'Nice try!';
   }
   return error;
 }



 const postData = async (data) => {
    try {
      await addDoc(userCollection, {
        name: data.name,
        emailid: data.email,
        password: data.password,
      });
    } catch (error) {
      setErrmsg(error.message)
      console.log(error.message);
    }
  };

  return (
    <div>
         <form className="add-form" onSubmit={formik.handleSubmit}>
         <label htmlFor="email">Name</label>
       <input
         id="name"
         name="name"
         type="name"
         onChange={formik.handleChange}
         value={formik.values.name}
       />
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
  <label htmlFor="password">Password</label>
       <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
       />

       <button type="submit">Add</button>
       {
        status &&  (
          <p>User id Added</p>
        )
       }
       {
        erMsg && (
          <p>{erMsg}</p>
        )
       }
     </form>
    </div>
  )
}

export default AddForm