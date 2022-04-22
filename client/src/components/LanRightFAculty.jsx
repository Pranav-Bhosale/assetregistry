import React from "react";
// import { useState } from "react";
// import { Redirect } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import firebaseConfig from "../firebaseconfig.js"
// import { getDatabase, ref, onValue } from "firebase/database";
// import { getAuth,sendPasswordResetEmail, sendEmailVerification,signInWithEmailAndPassword,browserSessionPersistence,setPersistence } from "firebase/auth";
// const app = initializeApp(firebaseConfig);

// const database = getDatabase(app);
// const auth = getAuth();

function LoginFormFaculty(props) {
  //   const path="/infoall/"+props.uid;

  //   const [email, setEmail] = useState("");
  //   const [pass, setPass] = useState("");
  //   const [text, settext] = useState("");
  //   const [redirect,setRedirect]=useState(false);

  //   if (redirect) {
  //     return <Redirect to={path} />
  //   }

  //   function resetPass()
  //   {
  //     if(email)
  //     {
  //     sendPasswordResetEmail(auth, email)
  //    .then(() => {
  //     settext("Password reset link has been sent to above email");
  //    })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     settext("Error!! " +errorCode);
  //   });
  //   }
  //   else{
  //     settext("Enter Email First! " );
  //   }
  //   }

  //  function handleLogin(e){
  //   e.preventDefault(e);
  //   setPersistence(auth, browserSessionPersistence)
  //   .then(() => {
  //     signInWithEmailAndPassword(auth, email, pass)
  //   .then((userCredential) => {

  //       return onValue(ref(database, '/faculty/' + userCredential.user.uid), (snapshot) => {
  //         if(snapshot.exists())
  //         {
  //           if(auth.currentUser.emailVerified)
  //           {
  //             settext("Success!!");
  //             setRedirect(true);
  //           }
  //           else{
  //             sendEmailVerification(auth.currentUser)
  //             .then(() => {
  //               settext("Verify your Email to sign in..Email verfification link has been sent to reistered Email");
  //             });
  //           }
  //         }
  //         else{
  //           return onValue(ref(database, '/admin/' + userCredential.user.uid), (snapshot) => {
  //             if(snapshot.exists())
  //             {
  //               if(auth.currentUser.emailVerified)
  //               {
  //                 settext("Success!!");
  //                 setRedirect(true);
  //               }
  //               else{
  //                 sendEmailVerification(auth.currentUser)
  //                 .then(() => {
  //                   settext("Verify your Email to sign in..Email verification link has been sent to registered Email");
  //                 });
  //               }
  //             }
  //             else{

  //             }

  //           }, {
  //             onlyOnce: true
  //           });
  //         }

  //       }, {
  //         onlyOnce: true
  //       });
  //   })
  //   .catch((error) => {
  //     settext("Failed !! \n"+error.code);
  //   });

  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     settext("Session Error "+errorCode);
  //   });
  //  }

  return (
    <div className="lanright">
      {/* //      <form onSubmit={handleLogin}>
//     <h1 className="loginText">Faculty Sign In</h1>
//     <input  spellCheck={false} onChange={(e) => setEmail(e.target.value)} type="email" className="email" placeholder="Email" />
//     <br/>
//     <input type="password" onChange={(e) => setPass(e.target.value)} className="password" placeholder="Password" />
//     <br />
//    <button type="submit" className="lanButton" >Sign In</button>
//    <button className="lanButton" onClick={resetPass} >Forgot Password</button> 
//     <br/>
//     <p>{text}</p>
//     </form> */}
    </div>
  );
}

export default LoginFormFaculty;
