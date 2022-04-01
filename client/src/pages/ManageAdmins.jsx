import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Tabs, Tab, Col, Form, Container, Button } from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";

function ViewAsset() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [text, settext] = useState("");
  const [passConf, setPassConf] = useState("");
  const [key, setKey] = useState("Manage Admin");
  const [Department, setDepartment] = React.useState("ALL");
  const [UserName, setUserName] = useState("");

  function handleLogin(e) {
    settext(null);
    e.preventDefault(e);
    if (email && pass && passConf) {
      if (pass === passConf) {
        // --------------------
        Axios.post("http://localhost:3002/register", {

          username: UserName,
          email: email,
          password: pass,
          deptID: Department //change to id
        }).then((response) => {

          console.log(response);
          if (response.status === 230) {
            settext(response.data.error);
          }
          else if (response.status === 201) {
            settext(response.data.message);
            document.getElementById("addAdmin").reset();
          }
          else if (response.status === 203) {
            settext(response.data.message + " " + response.data.error.name);
          }
        });



        // ---------------------------------
      } else {
        settext("Password not matched!");
      }
    } else {
      settext("Please Enter Complete Details!");
    }
  }

  return (
    <div className="navfootpad">
      <Navbar />

      <div style={{ margin: "30px" }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Manage Admin" title="Manage Admin">
            <p>empty</p>
          </Tab>

          <Tab eventKey="Add Admin" title="Add Admin">
            <Row style={{ margin: 0, padding: 0 }}>
              <h1
                style={{
                  textAlign: "center",
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginRight: "0",
                }}
              >
                Add Admin
              </h1>
              <hr style={{ margin: 0, padding: 0 }} />
            </Row>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <form id="addAdmin" onSubmit={handleLogin}>
                <Container
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    alignContent: "center",
                  }}

                >
                  <Row className="justify-content-md-center">
                    <Col
                      xs={{ span: 3, offset: 1 }}
                      style={{ textAlign: "left" }}
                    >
                      Admin Name :
                    </Col>
                    <Col xs={{ span: 7, offset: 0 }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text"
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Enter Name" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col
                      xs={{ span: 3, offset: 1 }}
                      style={{ textAlign: "left" }}
                    >
                      Email :
                    </Col>
                    <Col xs={{ span: 7, offset: 0 }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col
                      xs={{ span: 3, offset: 1 }}
                      style={{ textAlign: "left" }}
                    >
                      Department:
                    </Col>
                    <Col xs={{ span: 7, offset: 0 }}>
                      <Form.Group className="mb-3" controlId="formGridState">
                        <Form.Select
                          required
                          as="select"
                          onChange={(e) => {
                            setDepartment(e.target.value);
                          }}
                          custom
                        >
                          <option>All</option>
                          <option>IT</option>
                          <option>CSE</option>
                          <option>CIVIL</option>
                          <option>ELECTRICAL</option>
                          <option>ELECTRONICS</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col
                      xs={{ span: 3, offset: 1 }}
                      style={{ textAlign: "left" }}
                    >
                      Set Password:
                    </Col>
                    <Col xs={{ span: 7, offset: 0 }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          onChange={(e) => setPass(e.target.value)}
                          type="password"
                          placeholder="Enter Password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="justify-content-md-center">
                    <Col
                      xs={{ span: 3, offset: 1 }}
                      style={{ textAlign: "left" }}
                    >
                      Confirm Password:
                    </Col>
                    <Col xs={{ span: 7, offset: 0 }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          onChange={(e) => setPassConf(e.target.value)}
                          type="password"
                          placeholder="Enter Password Again"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Row></Row>
                    <Row></Row>
                    <Col md={{ span: 3, offset: 5 }}>
                      <button className="lanButton" type="reset">
                        Reset
                      </button>
                    </Col>
                    <Col md={{ span: 3, offset: 0 }}>
                      <button className="lanButton" type="submit">
                        Submit
                      </button>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col md={{ span: 4, offset: 4 }} ><p style={{ textAlign: "center" }}>{text}</p></Col>
                  </Row>
                </Container>
              </form>
            </div>

          </Tab>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

export default ViewAsset;
