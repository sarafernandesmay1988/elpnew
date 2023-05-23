import React, {useState, useEffect} from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import {  auth } from "../config/config";
import { useNavigate } from "react-router-dom";

const TheHeader = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user);
          } else {
            setAuthUser(null);
          }
        });
    
        return () => {
          listen();
        };
      }, []);

      const userSignOut = () => {
        auth.signOut()
          .then(() => {
            navigate("/")
            console.log("sign out successful");
          })
          .catch((error) => console.log(error));
      };    
        
    const navbar={
        display:'flex',
        flexDirection:'row',
        backgroundColor: 'rgba(153, 130, 130, 0.8)',
        gap:"950px",
        paddingLeft:"20px"
    }


  return (
    <nav>
        <div style={navbar}>
            <div><h1>Welcome</h1>
           <span> {`${authUser?.displayName} is logged` }</span>
            </div>
            <div className="signout">
                <p onClick={userSignOut}>Signout</p>
            </div>
            
        </div>
    </nav>
  )
}

export default TheHeader