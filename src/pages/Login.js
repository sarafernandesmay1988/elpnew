import React, {useState} from 'react'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../config/config";
import { signInWithEmailAndPassword  } from 'firebase/auth';
import Logo from "../assets/companylogo.png"
const Login = () => {
    const navigate = useNavigate();
    const [erMsg, setErrmsg]= useState([])
    const [status, setStatus]= useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    // const loginHandler = (e) => {
    //   e.preventDefault();
    //   alert(1)
    //     // navigate('/dashboard')
    // }
    const formik = useFormik({
        initialValues: {
          email: '',
          password:''
        },
        onSubmit: values => {
          setErrmsg()
          setSubmitButtonDisabled(true);
          // alert(JSON.stringify(values, null, 2));
          signInWithEmailAndPassword(auth,values.email, values.password)
          .then((userCredential) => {
            setSubmitButtonDisabled(false);
            console.log(12, userCredential)
            localStorage.setItem('userdata', JSON.stringify(userCredential.user.providerData[0]));
            if(userCredential.user)
            {
              if(userCredential.user.email === 'admin@iws.in'){
                
                navigate('./AdminDashboard')
              } else {
                navigate('./dashboard')
              }
            }
            console.log(userCredential);
          })
          .catch((error)=> {
            setSubmitButtonDisabled(false);

            setErrmsg(error.code)
            console.log(error)
          })
        },
      });

      const container={
        display: 'block',
        textAlign: 'center',
        margin: '0 auto',
        backgroundColor: 'pink',
        width: "50%",
        height: "400px",
        marginTop: "50px"
      }
      const form={
        display: 'block',
        textAlign: 'center',
        margin: '0 auto',
        backgroundColor: 'pink',
        width: "50%",
       paddingTop: "10px"
      }

      const fields={
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }

      const button={
        marginTop: "50px"
      }
  return (
    <div style={container}>
      <div className="logo">
        <img src={Logo}/>
      </div>
        <h1>Login</h1>
        <div style={form} >
        <form onSubmit={formik.handleSubmit}>
       <div style={fields} >
        <label htmlFor="email">Email </label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
       </div>
       <div style={fields} >
       <label htmlFor="password">Password</label>
       <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
       />
        
        </div>
       <button className="button-85" type="submit"
      >Login</button>
     </form>
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
        </div>
    </div>
  )
}

export default Login