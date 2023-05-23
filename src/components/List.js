import React, {useState, useEffect} from 'react'
import "./List.css"
import { db, auth, storage } from "../config/config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";


const List = ({userData,deleteHoliday }) => {

  console.log("user", userData)


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
      className="filter__link filter__link--number" >Status</a></div>
      <div className="header__item"><a id="total" 
      className="filter__link filter__link--number" >Actions</a></div>
      <div className="header__item"><a id="total" 
      className="filter__link filter__link--number" >delte</a></div>
		</div>
    {
      userData.map((item) => (
<div className="table-content" key={item.id}>	
			<div className="table-row">		
				<div className="table-data">{item.name}</div>
				<div className="table-data">{item.emailid}</div>
				<div className="table-data">{item.fromDate}</div>
				<div className="table-data">{item.toDate}</div>
				<div className="table-data">{item.reason}</div>
        <div className="table-data"
        >{item.status ? item.status : 'Pending'}</div>
        <div className="table-data">Edit</div>
        <div className="table-data"
        onClick={(e) => deleteHoliday(item.id)}
        >delete</div>
			</div>
		</div>	
      ))
    }
		
	</div>

  
</div>
  )
}

export default List