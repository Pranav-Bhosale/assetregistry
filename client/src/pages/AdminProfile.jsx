import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
var AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

function ViewAsset() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
    Axios.get("http://localhost:3002/logout", {}).then((response) => {
      if (response && response.status == 201) {
        window.location.reload();
      } else {
      }
    });
  };
  const handleShow = () => setShow(true);

  const [showChangePass, setShowChangePass] = React.useState(false);
  const handleCloseforchangePass = () => setShowChangePass(false);
  const handleShowchangePass = () => setShowChangePass(true);

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
    mail();
  }

  //SES

  var params = {
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        "swarangi.patil@gmail.com",
        /* more items */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email",
      },
    },
    Source: "wce.asset.registry@gmail.com" /* required */,
    ReplyToAddresses: [
      "wce.asset.registry@gmail.com",
      /* more items */
    ],
  };

  function mail() {
    var sendPromise = new AWS.SES({
      accessKeyId: "AKIA533U6AWI6MKHV3XV",
      secretAccessKey: "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",
      apiVersion: "2010-12-01",
    })
      .sendEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data) {
        console.log(data.MessageId);
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });
  }
  //SES
  return (
    <div className="navfootpad">
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

      <Modal show={showChangePass} onHide={handleCloseforchangePass}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Password reset link will be sent on registered email!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={dummyforchangepass}>
            Send Link
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar />

      <h1
        style={{
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
            <Col md={{ span: 3, offset: 4 }}>Email :</Col>
            <Col md={{ span: 5, offset: 0 }}>
              <p style={{ color: "#707070" }}> rishijadhav211@gmail.com</p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={{ span: 3, offset: 4 }}>Department :</Col>
            <Col md={{ span: 5, offset: 0 }}>
              <p style={{ color: "#707070" }}> rishijadhav211@gmail.com</p>
            </Col>
          </Row>
          <br></br>

          <Row className="justify-content-md-center">
            <Col md={{ span: 3, offset: 3 }} style={{ textAlign: "left" }}>
              <button className="lanButton" onClick={handleShow}>
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
      </div>
      <Footer />
    </div>
  );
}

export default ViewAsset;
