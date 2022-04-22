import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
Axios.defaults.withCredentials = true;
function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [text, settext] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/viewAsset1" />;
  }
  function resetPass() {
    if (email) {
      // reset pass
    } else {
      settext("Enter Email First! ");
    }
  }

  function handleLogin(e) {
    settext(null);
    e.preventDefault(e);
    if (email && pass) {
      Axios.post("http://localhost:3002/login", {
        email: email,
        password: pass,
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          setRedirect(true);
        } else if (response.status === 231) {
          settext(response.data.error);
        }
      });
    } else if (email) {
      settext("Enter Password! ");
    } else settext("Enter Email! ");
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1 className="loginText">Sign In</h1>
        <input
          spellCheck={false}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="email"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          className="password"
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button type="submit" className="lanButton">
          Sign In
        </button>
        <button onClick={resetPass} className="lanButton">
          Forgot Password
        </button>
        <br />
        <p>{text}</p>
      </form>
    </div>
  );
}

export default LoginForm;
