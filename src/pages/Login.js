import React, {useState} from 'react'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../config/config";
import { signInWithEmailAndPassword  } from 'firebase/auth';
import Logo from "../assets/imageFile"
const Login = () => {
    const navigate = useNavigate();
    const [erMsg, setErrmsg]= useState([])
    const [status, setStatus]= useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
const img="data:image/png;base64,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"
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
        <img src={img}/>
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