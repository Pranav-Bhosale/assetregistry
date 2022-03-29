import {React,useState} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {Form, Row, Col,FormControl,Modal,Button } from "react-bootstrap";

import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseconfig.js"
import { getAuth,sendPasswordResetEmail } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function Profile() {

  const [show1, setShow1] = useState(false);
  const email= auth.currentUser.email;
   const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setShow1(true);
    })
   .catch((error) => {
     const errorCode = error.code;
   });
  }

  return (

    <div className="navfootpad">
      <Navbar />
      <Row style={{ margin: 0, padding: 0, }}>
        <h1 style={{ textAlign: 'center', paddingLeft: '0', paddingRight: '0', marginRight: '0' }}>Profile</h1>
        <hr style={{ margin: 0, padding: 0, }} />
      </Row>
      <div className="formRow1">
      
        <Form.Group as={Row} className="mb-3" controlId="Email">
          <Form.Label column sm="2">
            Email :
          </Form.Label>
          <Col sm="10">
            <FormControl plaintext readOnly defaultValue={email} />
          </Col>
        </Form.Group>
        <hr style={{ padding: 0, marginTop: '20px', marginBottom: '20px' }} />
      </div>
      <div style={{textAlign:"center"}}>
     
      <button className="lanButton" onClick={handleShow1}  type="submit">Change Password</button>
      
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Password reset link has been sent to above email
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleClose1}>OK</Button>
        </Modal.Footer>
      </Modal>
      </div>

      
      <Footer />
    </div>
  );
}

export default Profile;