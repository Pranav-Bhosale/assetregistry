import React from "react";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";

function NotFound() {

  return (
    <div>
       <TitleBar />
       <div className="NotFoundPage">
         <div class="battery__sad">
         <div class="face"></div>
         <p className="opps">Opps!! No data found</p>
        </div>
       </div>
        
       <Footer />
    </div>
   
  );
}

export default NotFound;