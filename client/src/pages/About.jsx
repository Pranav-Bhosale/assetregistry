import React from "react";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import Card from "react-bootstrap/Card";
import Logoimg from "../images/logoRed.png";
import {Row,Col } from "react-bootstrap";
import {SiLinkedin,SiGmail} from "react-icons/si";
import { FcGoogle} from "react-icons/fc";

function ViewAsset() {
 
  return (
              <div className="navfootpad">
                  <TitleBar/>
              
      
          
          <div className="titlee">
          <h1 className="home-title" style={{textAlign:"center",paddingTop:"20px",fontSize:"30px"}}>
          <b><span>Developed Under Walchand Informatics Centre</span></b>
          </h1>
          </div>
          
          <br></br> 
          <div style={{textAlign:"center",fontSize:"20px"}}>
            <b>Guided by  &nbsp; : &nbsp; Mr. M.G.RATHI </b><br></br>
            <i style={{fontSize:"15px"}}>(Faculty IT Department)</i>
         
            <br></br>
            </div>
           
            <hr></hr>
            <p style={{textAlign:"center",fontSize:"20px"}}><b>&nbsp; &nbsp; Developers :</b></p>
          <Row style={{textAlign:"center",margin:"0",padding:"0"}} >
          
           <Col md={6}>
           <div className="card c1" >
            
            <h3 style={{marginTop:"10px"}}>Pranav Bhosale</h3>
            <div className="mb-2 text-muted">2019BTEIT00038</div>
            <Row>
            <Col style={{marginLeft:"30%",paddingBottom:"5px"}}><div className="iconn"> <a href="https://www.linkedin.com/in/pranav-bhosale"><SiLinkedin/></a></div></Col>
            <Col style={{marginRight:"30%",paddingBottom:"5px"}}><div className="iconn"><a href="mailto:pranav.b.bhosale@gmail.com"><SiGmail/></a></div></Col>
            </Row>
            
            </div>
            </Col>


            <Col md={6}>
            <div className="card c2" >
            
            <h3 style={{marginTop:"10px"}}>Rushikesh Jadhav</h3>
            <div className="mb-2 text-muted">2020BTEIT00206</div>
            <Row>
            <Col style={{marginLeft:"30%",paddingBottom:"5px"}}><div className="iconn"> <a href="https://www.linkedin.com/in/rushikesh-jadhav211"><SiLinkedin/></a></div></Col>
            <Col style={{marginRight:"30%",paddingBottom:"5px"}}><div className="iconn"><a href="mailto:rishijadhav211@gmail.com"><SiGmail/></a></div></Col>
            </Row>
            
            </div>
            </Col>
          </Row>
          <br></br>
          <div style={{textAlign:"center"}}>
          <Row style={{textAlign:"center",margin:"0",padding:"0"}} >
          <div className="card" style={{width:"300px",margin:"auto"}}>
            
            <h3 style={{marginTop:"10px"}}>Swarangi Patil</h3>
            <div className="mb-2 text-muted">2019BTEIT00056</div>
            <Row style={{textAlign:"center"}}>
            <Col style={{marginLeft:"30%",paddingBottom:"5px"}}><div className="iconn"> <a href="https://www.linkedin.com/in/swarangi-patil"><SiLinkedin/></a></div></Col>
            <Col style={{marginRight:"30%",paddingBottom:"5px"}}><div className="iconn"><a href="mailto:swarangi.patil@gmail.com"><SiGmail/></a></div></Col>
            </Row>
            
            </div>
          </Row>
          </div>
        
        <Footer />
    </div>
  );
}

export default ViewAsset;