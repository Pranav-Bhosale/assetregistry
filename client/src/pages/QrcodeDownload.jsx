import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Qr from "../components/Qr";


function QrcodeDownload() {
 
  return (
    <div className="navfootpad">
        <Navbar />
         <div>
        <Qr/>
         </div>
        <Footer />
    </div>
  );
}

export default QrcodeDownload;