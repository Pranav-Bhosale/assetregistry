
import React from "react";
import OtpInput from 'react-otp-input';

function ViewAsset(props){

 
    return (
        <>
      <OtpInput
        value={props.otp}
        // onChange={(e) => {props.setOtp(e.target.value), console.log(props.otp)}}
        numInputs={6}
        separator={<span>-</span>}

      />
      </>
    );
}
export default ViewAsset;
