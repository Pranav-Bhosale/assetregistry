import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import Axios from "axios";
import { Redirect } from "react-router-dom";

function ViewAsset() {
  const [show, setShow] = React.useState(false);
  const [reset_first,setReset_first]=React.useState(null);
  const [reset_confirm,setReset_confirm]=React.useState(null);
  const [showChangePass, setShowChangePass] = React.useState(false);
  const [otp, setOtp] = React.useState(null);
  const [text,setText]= React.useState("hello");



  const handleClose= () =>{
    setShow(false);
  }
  const handleLogout = () => {
    setShow(false);
    Axios.get("http://localhost:3002/logout", {}).then((response) => {
      if (response && response.status == 201) {
        window.location.reload();
      } else {
      }
    });
  };
  const handleShow = () => setShow(true);

  
  const handleCloseforchangePass = () => setShowChangePass(false);
  const handleShowchangePass = () => setShowChangePass(true);

  

  function dummyforchangepass() {
    setShowChangePass(false);
    console.log("success!")
  }
function handleResetPass(){
  if(reset_confirm === reset_first){
    setText("Success!");
  }
  else{
    setText("Password Does Not match!");
  }
}


  function handlesubmitOtp() {
    console.log(otp);
  }
 




  const [logedIN, setlogedIN] = React.useState(true);
  React.useEffect(() => {
    try {
      Axios.post("http://localhost:3002/islogedin", {}).then((response) => {
        if (response && response.status == 266) {
          setlogedIN(true);
          console.log("266");
        } else {
          console.log("login aain");
          setlogedIN(false);
        }
      });
    } catch (error) {
      console.log(error);
      window.alert("Error!");
    }
  }, []);

  if (!logedIN) {
    return <Redirect to="/admin" />;
  }

  function dummyforchangepass() {
    setShowChangePass(false);
    try {
      Axios.get("http://localhost:3002/getOTP", {}).then((response) => {
        if (response && response.status == 201) {
          console.log("mail sent");
        } else {
          console.log(response);
        }
      });
    } catch (error) {
      console.log(error);
      window.alert("Error!");
    }
  }

  //SES
  //SES
  return (
    <div className="navfootpad">

   
    <div >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loging Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to Logout!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loging Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to Logout!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showChangePass} onHide={handleCloseforchangePass}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Password reset link will be sent on registered email!</Modal.Body>

        <Modal.Footer>
          <Button variant="warning" onClick={dummyforchangepass}>
            Send Link
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar />

      <h1 style={{
        textAlign: "center",
        paddingLeft: "0",
        paddingRight: "0",
        marginRight: "0",
      }}
      >
        Profile
      </h1>
      <hr></hr>
      <div>

        <Container
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            alignContent: "center",
            marginTop: "50px",
            border: "1px solid",
          }}
        >
          <br></br>
          <Row className="justify-content-md-center">
          
            <Col md={{ span: 3, offset: 4 }}>User Name :</Col>
            <Col md={{ span: 5, offset: 0 }}>
              <p style={{ color: "#707070" }}> rishijadhav211@gmail.com</p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={{ span: 3, offset: 4 }}>
              Email :
            </Col>
            <Col md={{ span: 5, offset: 0 }}>
              <p style={{ color: "#707070" }}> rishijadhav211@gmail.com</p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={{ span: 3, offset: 4 }}>
              Department :
            </Col>
            <Col md={{ span: 5, offset: 0 }}>
              <p style={{ color: "#707070" }}> rishijadhav211@gmail.com</p>
            </Col>
          </Row>
          <br></br>

          <Row className="justify-content-md-center">
            <Col md={{ span: 3, offset: 3 }} style={{ textAlign: "left" }}>
              <button className="lanButton" onClick={handleShow} >
                Logout
              </button>
            </Col>
            <Col md={{ span: 4, offset: 0 }} style={{ textAlign: "left" }}>
              <button className="lanButton" onClick={handleShowchangePass}>
                Change Password
              </button>
            </Col>
          </Row>
        </Container>
        <div>


          <Container style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            alignContent: "center",
            marginTop: "50px",
            border: "1px solid",
            // display: "none"
          }}>
            <Form style={{ paddingTop: "20px", paddingBottom: "20px" }} onSubmit={handlesubmitOtp}>
              {/* ================================================================================= */}
              <Row className="justify-content-md-center">
                <Col md={{ span: 3, offset: 4 }}>
                  Enter OTP :
                </Col>
                <Col style={{ textAlign: "left" }} md={{ span: 5, offset: 0 }}  >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text"
                    required
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter password" />
                </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
              <Col xs={{ span: 5, offset: 0 }} style={{textAlign: "center",}}>
                <button className="lanButton" type="submit">
                  Submit
                </button>
                </Col>
            </Row>
            </Form>

          </Container>
          

          <Container style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            alignContent: "center",
            marginTop: "50px",
            border: "1px solid",
            // display: "none"
          }}>



          <Form style={{ paddingTop: "20px", paddingBottom: "20px" }} id="reset" onSubmit={handleResetPass} >
            <Row className="justify-content-md-center">
              <Col xs={{ span: 5, offset: 0 }}>
              <Form.Label>Enter Password</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="password"
                  required
                    onChange={(e) => setReset_first(e.target.value)}
                    placeholder="Enter password" />
                </Form.Group>
              </Col>
              </Row>
              <Row className="justify-content-md-center">

              <Col xs={{ span: 5, offset: 0 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password"
                  required
                    onChange={(e) => setReset_confirm(e.target.value)}
                    placeholder="Enter Same Password" />
                </Form.Group>
              </Col>
              </Row>
            
            <Row className="justify-content-md-center">
              <Col xs={{ span: 5, offset: 0 }} style={{textAlign: "center",}}>
                <button className="lanButton" type="submit">
                  Submit
                </button>
                </Col>
            </Row>
            
          </Form>
          </Container>
        </div>
      </div>
      <div>
      <Row className="justify-content-md-center">
            <p style={{textAlign: "center"}}>{text}</p>
            </Row>
</div>
      <Footer/>
      </div>
    </div>
  );
}

export default ViewAsset;
