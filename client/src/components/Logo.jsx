import React from "react";
import Logoimg from "../images/logo.png";

function Logo(props) {
  return (
    <img style={props.style} className="logo1" src={Logoimg} alt="Logo"/>
  );
}

export default Logo;