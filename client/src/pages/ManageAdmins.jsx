import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Row,
  Tabs,
  Tab,
  Col,
  Form,
  Container,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";
import { Dummyadmindata } from "../components/Dummyadmindata";

import { TiUserDelete } from "react-icons/ti";
import { useSSRSafeId } from "@react-aria/ssr";

function ViewAsset() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [text, settext] = useState("");
  const [passConf, setPassConf] = useState("");
  const [key, setKey] = useState("Manage Admin");
  const [Department, setDepartment] = React.useState("ALL");
  const [UserName, setUserName] = useState("");
  const [show, setShow] = React.useState(false);
  const [userdata, setUserdata] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [currentUserName, setCurrentUserName] = React.useState(null);
  const [lefttabtext,setLefttabtext]=React.useState("");
  const [currentemail,setCurrentemail]=React.useState("");
  const [showdelete,setShowdelete]=React.useState(false);
  const [textdelmodal,setTextdelmodal]=React.useState("");
  const [currentuserDep,setcurrentuserDep]=React.useState("");
  try {
    //axios get route..if(respoise){ data assin var}..else setTet(error fetchoin data)
  } catch (e) {
    //settext("error fetibg data")
  }

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
          deptID: Department, //change to id
        }).then((response) => {
          console.log(response);
          if (response.status === 230) {
            settext(response.data.error);
          } else if (response.status === 201) {
            settext(response.data.message);
            document.getElementById("addAdmin").reset();
          } else if (response.status === 203) {
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
  const handleClose = () => {
    setShow(false);
  };

  const handleClosedelete = () => {
    setShowdelete(false);
  };

  const handleshowfordelete = (text) => {
    setShowdelete(true);
    setTextdelmodal(text);
  };

  const handleShow = (index, username, email) => {
    setShow(true);
    setCurrentIndex(index);
    setCurrentUserName(username);
    setCurrentemail(email);
  };

  function handeldel() {
    //Axios req post {email:email}--> res{if() below line ....else(){ error deleting}}
    Axios.post("http://localhost:3002/deleteadmin", {
      email: currentemail,
    }).then((response) => {
      setShow(false);
      console.log(response);
      if (response.status == 201) {
        const copyPostArray = Object.assign([], userdata);
        copyPostArray.splice(currentIndex, 1);
        setUserdata(copyPostArray);
        handleshowfordelete("Admin Deleted!");
      } else {
        handleshowfordelete("Error deleting admin");
        // setLefttabtext("Error deleting admin")
      }
    });

    // delete of user code goes here
  }

  React.useEffect(() => {
    //Runs only on the first render
      
      Axios.get("http://localhost:3002/getalladmin")
        .then(function (response) {
  
          // const res = response.data[0];
          if(response.status==201){
           setUserdata(response.data.users);
          }
          else{
            setLefttabtext("Data not found");
          }
        })
        .catch(function (error) {
          console.log(error);
          setLefttabtext("Data not found");
        })
      .catch(function (error) {
        console.log(error);
        setLefttabtext("Data not found");
      });
  }, []);


  function renderadmins(userdata) {
    let items = [];

    userdata.map((item, index) => {
      if (item.deptID != "ALL") {
        items.push(
          <Col>
            <Card
              style={{ width: "20rem", margin: "10px" }}
              key={index + item.username}
            >
              <Card.Body>
                <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <Col style={{ color: "grey" }}>
                    <i>Username:</i>
                  </Col>
                </Row>

                <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <Col>{item.username}</Col>
                </Row>

                <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <Col style={{ color: "grey" }}>
                    <i>Email:</i>
                  </Col>
                </Row>

                <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <Col>{item.email}</Col>
                </Row>

                <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <Col style={{ color: "grey" }}>
                    <i>Department:</i>
                  </Col>
                </Row>
                <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <Col>{item.deptID}</Col>
                </Row>

                <Row
                  style={{ margin: "20px" }}
                  className="justify-content-md-center"
                >
                  <Button
                    variant="danger"
                    onClick={() => handleShow(index, item.username, item.email)}
                  >
                    Delete Admin
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        );
      }
    });
    return items;
  }

//   React.useEffect(() => {
        
//     Axios.get("http://localhost:3002/userdetails")
//       .then(function (response) {

//         if(response.status==201){
//           console.log(response);
//           setcurrentuserDep(response.data.dep);
//         }
//         else{
//           console.log("error fetching user info");
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//         return(<p>Error fetching user detail</p>);
//       });
  
// }, []);

 function showManageadmin(){
  Axios.get("http://localhost:3002/userdetails")
  .then(function (response) {

    if(response.status==201){
      setcurrentuserDep(response.data.dep);
    }
    else{
      console.log("error fetching user info");
    }
  })
  .catch(function (error) {
    console.log(error);
    return(<p>Error fetching user detail</p>);
  });

  if(currentuserDep==="ALL"){
    return(
       <div style={{ margin: "30px" }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Manage Admin" title="Manage Admin">
            <Row style={{ margin: 0, padding: 0 }}>
              <h1
                style={{
                  textAlign: "center",
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginRight: "0",
                }}
              >
                Admin List
              </h1>
              <hr style={{ margin: 0, padding: 0 }} />
            </Row>

            <div className="showitems">
              <Container>
                <Row md={3}>
                  {renderadmins(userdata)}
                </Row>
              </Container>
              <Row className="justify-content-md-center">
                <p style={{ color: "red", textAlign: "center" }}>
                  {lefttabtext}
                </p>
              </Row>
            </div>
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
                        <Form.Control
                          type="text"
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Enter Name"
                        />
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
                    <Col md={{ span: 4, offset: 4 }}>
                      <p style={{ textAlign: "center" }}>{text}</p>
                    </Col>
                  </Row>
                </Container>
              </form>
            </div>
          </Tab>
        </Tabs>
      </div> 
    )
  }
  else{
    return(<Row style={{textAlign:"center"}}> <b>YOU ARE NOT A GENERAL ADMIN</b> </Row>);
  }
 }


  
  return (
    <div className="navfootpad">

<Modal show={showdelete} onHide={handleClosedelete}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Alert!</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>{textdelmodal} "{currentUserName}"</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete admin{" "}"{currentUserName}"</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handeldel}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar />

      {/* <div style={{ margin: "30px" }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Manage Admin" title="Manage Admin">
            <Row style={{ margin: 0, padding: 0 }}>
              <h1
                style={{
                  textAlign: "center",
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginRight: "0",
                }}
              >
                Admin List
              </h1>
              <hr style={{ margin: 0, padding: 0 }} />
            </Row>

            <div className="showitems">
              <Container>
                <Row md={3}>
                  {renderadmins(userdata)}
                </Row>
              </Container>
              <Row className="justify-content-md-center">
                  <p style={{color:"red", textAlign: "center"}}>{lefttabtext}</p>
                </Row>
            </div>
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
                        <Form.Control
                          type="text"
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Enter Name"
                        />
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
                    <Col md={{ span: 4, offset: 4 }}>
                      <p style={{ textAlign: "center" }}>{text}</p>
                    </Col>
                  </Row>
                </Container>
              </form>
            </div>
          </Tab>
        </Tabs>
      </div> */}
      {showManageadmin()}
      <Footer />
    </div>
  );
}

export default ViewAsset;
