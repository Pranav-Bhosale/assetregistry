import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { Redirect } from "react-router-dom";

function ViewAsset(props) {
  const [text, setText] = React.useState(
    "OTP has been sent to registered email..Enter OTP"
  );
  const [showChangePass, setShowChangePass] = React.useState(false);
  const [reset_first, setReset_first] = React.useState(null);
  const [reset_confirm, setReset_confirm] = React.useState(null);
  const [otp, setOtp] = React.useState(null);
  const [displayotp, setdisplayotp] = React.useState("");
  const [displaypass, setdisplaypass] = React.useState("none");
  const email = props.location.state.email;
  const [redirect, setRedirect] = React.useState(false);

  const handleCloseforchangePass = () => setShowChangePass(false);
  const handleShowchangePass = () => setShowChangePass(true);

  function dummyforchangepass() {
    setShowChangePass(false);
    setText(null);
    try {
      Axios.get("http://localhost:3002/getOTP", {}).then((response) => {
        if (response && response.status == 201) {
          setText("New OTP has been sent to registered email..Enter OTP");
        } else {
          console.log(response);
        }
      });
    } catch (error) {
      setText("Error Sending OTP..");
      console.log(error);
      window.alert("Error!");
    }
  }

  function Redirecting() {
    setTimeout(function () {
      setRedirect(true);
    }, 3000);
  }
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/admin",
        }}
      />
    );
  }

  function handleResetPass(e) {
    e.preventDefault(e);

    if (reset_confirm === reset_first) {
      try {
        Axios.post("http://localhost:3002/setnewpass", {
          email: email,
          pass: reset_confirm,
        }).then((response) => {
          console.log(response);
          if (response && response.status == 244) {
            setdisplaypass("none");
            setText("Passord Changed Successfully..Redirecting...");
            Redirecting();
          } else {
            setText("Error Changing Password..");
          }
        });
      } catch (e) {
        setText("Error Changing Password..");
      }
    } else {
      setText("Password Does Not match!");
    }
  }

  function handlesubmitOtp(e) {
    e.preventDefault(e);
    setText(null);
    if (!otp) setText("Please Enter OTP");
    else if (otp.length < 6) setText("OTP Should be 6 Digit");
    else {
      try {
        Axios.post("http://localhost:3002/validateOTP", {
          OTP: otp,
          email: email,
        }).then((response) => {
          if (response && response.status == 244) {
            setdisplayotp("none");
            setdisplaypass("");
          } else {
            setText("Wrong OTP..");
          }
        });
      } catch (e) {
        setText("Error Validating OTP..");
      }
    }
  }
  return (
    <div className="navfootpad">
      <Navbar />
      <div>
        <div>
          <Modal show={showChangePass} onHide={handleCloseforchangePass}>
            <Modal.Header closeButton>
              <Modal.Title>Resend OTP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Previous OTP will be invalid.. new OTP will be sent on registered
              email!
            </Modal.Body>

            <Modal.Footer>
              <Button variant="warning" onClick={dummyforchangepass}>
                Resend OTP
              </Button>
            </Modal.Footer>
          </Modal>

          <Container
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              alignContent: "center",
              marginTop: "200px",
              border: "1px solid",
              display: displayotp,
            }}
          >
            <Form
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
              onSubmit={handlesubmitOtp}
            >
              {/* ================================================================================= */}
              <Row className="justify-content-md-center">
                <Col md={{ span: 3, offset: 4 }}>Enter OTP :</Col>
                <Col style={{ textAlign: "left" }} md={{ span: 5, offset: 0 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      required
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col
                  xs={{ span: 5, offset: 0 }}
                  style={{ textAlign: "center" }}
                >
                  <button className="lanButton" type="submit">
                    Submit
                  </button>
                </Col>
                <Col
                  xs={{ span: 5, offset: 0 }}
                  style={{ textAlign: "center" }}
                >
                  <button className="lanButton" onClick={handleShowchangePass}>
                    Resend OTP
                  </button>
                </Col>
              </Row>
            </Form>
          </Container>

          <Container
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              alignContent: "center",
              marginTop: "200px",
              border: "1px solid",
              display: displaypass,
            }}
          >
            <Form
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
              id="reset"
              onSubmit={handleResetPass}
            >
              <Row className="justify-content-md-center">
                <Col xs={{ span: 5, offset: 0 }}>
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="password"
                      required
                      onChange={(e) => setReset_first(e.target.value)}
                      placeholder="Enter password"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col xs={{ span: 5, offset: 0 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      onChange={(e) => setReset_confirm(e.target.value)}
                      placeholder="Enter Same Password"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                <Col
                  xs={{ span: 5, offset: 0 }}
                  style={{ textAlign: "center" }}
                >
                  <button className="lanButton" type="submit">
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
      <Footer />
    </div>
  );
}

export default ViewAsset;
