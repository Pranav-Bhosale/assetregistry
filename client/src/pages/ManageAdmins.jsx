import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row,Tabs,Tab } from "react-bootstrap";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseconfig.js"
import { getDatabase, ref, set ,onValue} from "firebase/database";
import { getAuth,createUserWithEmailAndPassword,sendEmailVerification,browserSessionPersistence,setPersistence } from "firebase/auth";
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth();

function ViewAsset() {
 

    const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [text, settext] = useState("");
  const [passConf, setPassConf] = useState("");
  const [key, setKey] = useState('Manage Admin');

  function handleLogin(e){
    settext(null);
    e.preventDefault(e);
        if(email&&pass&&passConf)
        {
            if(pass===passConf)
            {
                createUserWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                  const user = userCredential.user;
                  const uiduser=user.uid;
                  sendEmailVerification(user)
                .then(() => {
                        set(ref(database, '/faculty/'+uiduser),"uid").then(() => {
                         settext("Faculty Added Successfully!...Email verification link has been sent to their email")
                        })
                        .catch((error) => {
                           settext(error);
                        });      
                      
                      })

                 }).catch((error) => {
                  settext(error.code);
               });      
             
            }
            else
            {
                settext("Password not matched!");  
            }
        }
        else{
            settext("Please Enter Complete Details!");  
        }
    //   signInWithEmailAndPassword(auth, email, pass)
    // .then((userCredential) => {
    
    //     return onValue(ref(database, '/admin/' + userCredential.user.uid), (snapshot) => {
    //       if(snapshot.exists())
    //       {
            
    //         if(auth.currentUser.emailVerified)
    //         {
    //           settext("Success!!");
    //           setRedirect(true);
    //         }
    //         else{
    //           sendEmailVerification(auth.currentUser)
    //           .then(() => {
    //             settext("Verify your Email to sign in..Email verification link has been sent to registered Email");
    //           });
    //         }
            
            
    //       }
    //       else{
    //         settext("You are not a ADMIN!!");
    //       }
        
    //     }, {
    //       onlyOnce: true
    //     });
    // })
    // .catch((error) => {
    //   settext("Failed !! \n"+error.code);
    // });
      
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   settext("Session Error "+errorCode);
    // }); 
  }
   
  return (
    <div className="navfootpad">
        <Navbar />

        <div style={{margin:"30px"}}>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      
      <Tab eventKey="Manage Admin" title="Manage Admin">
        <p>empty</p>
      </Tab>
      <Tab eventKey="Add Admin" title="Add Admin">
      <Row style={{ margin: 0, padding: 0, }}>
        <h1 style={{ textAlign: 'center', paddingLeft: '0', paddingRight: '0', marginRight: '0' }}>Add Admin</h1>
        <hr style={{ margin: 0, padding: 0, }} />
      </Row>
        <div style={{textAlign:"center", marginTop:"30px"}}>
  <form onSubmit={handleLogin}>
    <input  spellCheck={false} type="email" onChange={(e) => setEmail(e.target.value)} className="email" placeholder="Email" />
    <br/>
    <input type="password" className="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
    <br />
    <input type="password" className="password" onChange={(e) => setPassConf(e.target.value)} placeholder="Confirm Password" />
    <br/>
    <button type="submit" className="lanButton" >Sign Up</button>
    <br/>
     <p>{text}</p> 
  </form>
</div>
      </Tab>

    </Tabs>
    </div>

        <Footer />
    </div>
  );
}

export default ViewAsset;