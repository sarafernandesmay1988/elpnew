import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import List from "./List";
import { db, auth, storage } from "../config/config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import useFetchHolidays from "../customHooks/useFetchHolidays";

const Form = ({getHolidays}) => {
  const [userData, setuserData] = useState([])
  const userCollection = collection(db, "users");
  const [emptyError, setemptyError] = useState(false)
  const [errMsg, seterrMsg] = useState('')
  const [open, setOpen] = React.useState(false);
  const [email, setemail] = useState('')
  const [name, setname] = useState('')
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const holidays = useFetchHolidays();
  const { vertical, horizontal } = state;

  useEffect(() =>{
    const items = JSON.parse(localStorage.getItem('userdata'));
    setemail(items.email)
    setname(items.displayName)
  },[])

  
    const formik = useFormik({
        initialValues: {
          name: '',
          emailid: '',
          fromDate:'',
          toDate:'',
          reason:''
        },
        onSubmit: values => {
          
          if(values.reason.length == 0 &&
            values.toDate.length == 0 &&
            values.fromDate.length == 0 
            )
          {
            handleClick()
            seterrMsg("It should not empty")
            setemptyError(true)
          } else{
            let data=JSON.stringify(values, null, 2)
            console.log(values)
            // console.log(JSON.stringify(values, null, 2));
            postData(values)
          }
          // console.log(JSON.stringify(values, null, 2));
        },
      });
      const deleteHoliday = async (id) => {

        const movieDoc = doc(db, "users", id);
        await deleteDoc(movieDoc);
        getHolidays();
      };

  const handleClick = () => {
    setOpen(true);
  };



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
      const postData = async (data) => {
        try {
          await addDoc(userCollection, {
            name: name,
            emailid: email,
            fromDate: data.fromDate,
            toDate: data.toDate,
            reason:data.reason
          });
          getHolidays();
        } catch (err) {
          console.error(err);
        }
      };
  

      // const getHolidays = async () => {
      //   try {
      //     const data = await getDocs(userCollection);
      //     const filteredData = data.docs.map((doc) => ({
      //       ...doc.data(),
      //       id: doc.id,
      //     }));
      //     console.log("f",filteredData)
      //       const finaldata= filteredData.filter((f) => f.emailid === email)
      //     setuserData(finaldata)
      //     console.log(finaldata)
      //     localStorage.setItem('holidays',  JSON.stringify(finaldata));
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };

      const action = (
        <React.Fragment>
          
          {/* <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton> */}
        </React.Fragment>
      );

   

    
  return (
    <div>
        
<form onSubmit={formik.handleSubmit}>
{/* <Snackbar
anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message={errMsg}
        action={action}
        key={vertical + horizontal}
      /> */}
   <label htmlFor="fromDate">From</label>
   <input type="date" id="fromDate" 
    onChange={formik.handleChange}
    value={formik.values.fromDate}
   name="fromDate"/>
   <label htmlFor="fromDate">To</label>
   <input type="date" id="toDate"
    onChange={formik.handleChange}
    value={formik.values.toDate} name="toDate"/>
    <label htmlFor="reason">reason</label>
       <input
         id="reason"
         name="reason"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.reason}
       />
  <button className="button-85" type="submit"
       >Add</button> 
  </form>
 
  
  {/* <List userData={userData} deleteHoliday={deleteHoliday}/> */}
 
    </div>
  )
}

export default Form