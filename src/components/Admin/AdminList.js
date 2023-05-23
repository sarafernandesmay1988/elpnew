import React, {useState, useEffect, useMemo} from 'react'
import "./List.css"
import { db, auth, storage } from "../../config/config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import useFetchHolidays from "../../customHooks/useFetchHolidays";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, useFirestoreEmulator } from "firebase/firestore";


const AdminList = ({userData }) => {
const [holidays, setholidays] = useState([])
const [openDropdown, setopenDropdown] = useState(false)
const [Posts, setPosts] = useState([])
const [userHolidayData, setuserHolidayData] = useState([])

const [approvalValue, setApprovalValue] = useState('')
const openDropdownHandler = () =>{
  setopenDropdown(!openDropdown)
}
const data= useFetchHolidays()
const db = getFirestore();
// const dbRef = collection(db, "users");
const userCollection = collection(db, "users");


const handleSelect = async (e) => {
  const filteredUser = data[0].filter((i) => i.id == e.target.id)
  const {emailid, fromDate, toDate,name, reason, status} = filteredUser
  const washingtonRef = doc(db, "users", e.target.id);

  await updateDoc(washingtonRef, {
    status: e.target.value
  });
  getHolidays();
  setopenDropdown(false);
}
const getHolidays = async () => {
     
  try {
    const data = await getDocs(userCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
      const finaldata= filteredData.filter((f) => f.emailid !== 'admin@iws.in')
       setuserHolidayData(finaldata)
    
  } catch (err) {
    console.error(err);
  }
};



useEffect(() => {
  getHolidays();
},[])
  return (
       <div className="container">
	
	<div className="table">
		<div className="table-header">
			<div className="header__item"><a id="name" 
      className="filter__link" >Name</a></div>
			<div className="header__item"><a id="wins"
       className="filter__link filter__link--number" >Emailid</a></div>
		<div className="header__item"><a id="losses"
       className="filter__link filter__link--number" >From</a></div>
			<div className="header__item"><a id="total" 
      className="filter__link filter__link--number" >To</a></div>
      	<div className="header__item"><a id="total" 
      className="filter__link filter__link--number" >Reasons</a></div>
      	<div className="header__item"><a id="total" 
      className="filter__link filter__link--number" >Click to change Status</a></div>
      {/* <div className="header__item"><a id="total" 
      className="filter__link filter__link--number" >Actions</a></div> */}
      {/* <div className="header__item"><a id="total" 
      className="filter__link filter__link--number" >delte</a></div> */}
		</div>
    {
      userHolidayData.map((item) => (
<div className="table-content" key={item.id}>	
			<div className="table-row">		
				<div className="table-data">{item.name}</div>
				<div className="table-data">{item.emailid}</div>
				<div className="table-data">{item.fromDate}</div>
				<div className="table-data">{item.toDate}</div>
				<div className="table-data">{item.reason}</div>
        <div className="table-data"
        onClick={openDropdownHandler}>
          {item.status ? item.status : 'Pending'}</div>
          {
            openDropdown && (
              <>
              <select
              onChange={handleSelect}
              name="se" id={item.id}
              >
  <option value="Approve"></option>
  <option value="Approve">Approve</option>
  <option value="Reject">Reject</option>
</select>
<span onClick={() => setopenDropdown(false)}>Cancel</span>
</>
            )
          }
        {/* <div className="table-data">Edit</div> */}
        
			</div>
		</div>	
      ))
    }
		
	</div>

  
</div>
  )
}

export default AdminList