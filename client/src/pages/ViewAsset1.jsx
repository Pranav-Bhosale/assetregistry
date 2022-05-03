import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Col, Card, Accordion, Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BiSearchAlt } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import Child from "./DeptDropdown";

import Axios from "axios";

function ViewAsset() {
  const history = useHistory();
  const [redirect, setRedirect] = React.useState(false);
  const [redirectUpdate, setRedirectUpdate] = React.useState(false);
  const [redirectUID, setRedirectUID] = React.useState(null);
  const [UID, setUID] = React.useState(null);
  const [Resmsg, setResmsg] = React.useState(null);
  const [Resmsgcolor, setResmesgcolor] = React.useState("black");
  const [EqpType, setEqpType] = React.useState("Camera");
  const [NameOfEqp, setNameOfEqp] = React.useState("Web");
  const [Department, setDepartment] = React.useState("None");
  const [queriedData, setqueriedData] = React.useState([]);
  const [deluid, setdeluid] = React.useState(null);
  const [delid, setdelid] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [startYear, setStartYear] = React.useState(0);
  const [endYear, setEndYear] = React.useState(0);
  const [startCost, setStartCost] = React.useState(0);
  const [endCost, setEndCost] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [logedIN, setlogedIN] = React.useState(true);

  React.useEffect(() => {
    try {
      Axios.post("http://localhost:3002/islogedin", {}).then((response) => {
        if (response && response.status == 266) {
          setlogedIN(true);
          console.log("266");
        } else {
          console.log("login again");
          setlogedIN(false);
        }
      });
    } catch (error) {
      console.log(error);
      window.alert("Error!");
    }


  }, []);

  React.useEffect(() => {
    if (!isActive) {
      setStartYear(0);
      setEndYear(0);
      setStartCost(0);
      setEndCost(0);
    }
  });

  React.useEffect(() => {

    if (startYear === '') {
      setStartYear(0);
    }
    if (endYear === '') {

      setEndYear(0);
    }
    if (startCost === '') {
      setStartCost(0);
    }
    if (endCost === '') {
      setEndCost(0);
    }
  }
  );

  if (!logedIN) {
    return <Redirect to="/admin" />;
  }

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  function handeldel() {
    var id = delid;
    var uid = deluid;
    Axios.post("http://localhost:3002/deleteasset", {
      UID: uid,
    }).then((response) => {
      if (response.data.success) {
        const copyPostArray = Object.assign([], queriedData);
        copyPostArray.splice(id, 1);
        setqueriedData(copyPostArray);
        setdelid(null);
        setdeluid(null);
        handleClose();
      }
    });
  }

  function childToParent(deptstring) {
    setDepartment(deptstring);
  }

  const dropdownlist = {
    Camera: ["Web", "Analog", "IP Based", "Other"],
    Computer: ["Laptop", "Desktop", "Server", "Other"],
    Monitor: ["LCD", "TFT", "LED", "Other"],
    MFD: ["Laser Printer+Scanner", "Inkjet Printer+Scanner", "Other"],
    Network_Device: [
      "Router",
      "Switch",
      "DVR",
      "NVR",
      "Wi-Fi",
      "Access Point",
      "Other",
    ],
    Printer: ["Inject", "Laser", "Dot Matrix", "Other"],
    Scanner: ["Flat", "Bed", "Other"],
    UPS: ["500 VA", "1 KVA", "Other"],
    Software: ["System(OS)", "Application", "Other"],
    Other: ["Projector", "Xerox Machine", "Other"],
    None: ["None"],
  };

  if (redirect) {
    history.push("/addAsset2/" + redirectUID);
    // return <Redirect to={{
    //   pathname:
    // }} />
  }
  if (redirectUpdate) {
    history.push("/updateAsset/" + redirectUID);
    // return <Redirect to={{
    //   pathname:"/updateAsset/"+redirectUID
    // }} />
  }
  function createSelectItems() {
    let items = [];
    for (const key of Object.keys(dropdownlist)) {
      items.push(<option key={key}>{key}</option>);
    }
    return items;
  }

  function createSecondItems(val) {
    let items = [];
    const list = dropdownlist[val];
    list.forEach((element) => {
      items.push(<option key={element}>{element}</option>);
    });
    return items;
  }

  function queriedDatadisplay(queriedData) {
    let items = [];
    queriedData.map((element, index) => {
      var id = index;
      items.push(
        <Accordion id={id} key={id + 1} defaultActiveKey="1">
          <Accordion.Item
            eventKey="0"
            border="primary"
            style={{
              textAlign: "center",
              backgrounColor: "#F0FFFF",
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                display: "flex",
                top: 0,
                left: 5,
                padding: 0,
                margin: 0,
              }}
            >
              {id + 1}
            </p>
            <Accordion.Header>
              <Card
                className="text-center"
                style={{ width: "100%", textAlign: "center" }}
              >
                <Card.Header>
                  <Row>
                    <Col md="6">
                      UID&nbsp;:&nbsp;{element.UID}
                      <hr></hr>
                    </Col>
                    <Col md="6">
                      Asset Number&nbsp;:&nbsp;{element.AssetNumber}
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      Equipment Type&nbsp;:&nbsp;{element.EqpType}
                      <hr></hr>
                    </Col>
                    <Col md="6">
                      Name of Equipment&nbsp;:&nbsp;{element.NameOfEqp}
                      <hr></hr>
                    </Col>
                  </Row>
                </Card.Header>
              </Card>
            </Accordion.Header>
            <Accordion.Body border="primary">
              <Row>
                <Col>
                  <button
                    className="simplebtn"
                    onClick={(e) => {
                      setRedirectUID(element.UID);
                      setRedirect(true);
                    }}
                  >
                    View
                  </button>
                </Col>
                <Col>
                  <button
                    className="simplebtn"
                    onClick={(e) => {
                      setRedirectUID(element.UID);
                      setRedirectUpdate(true);
                    }}
                  >
                    Update
                  </button>
                </Col>
                <Col>
                  <button
                    className="simplebtn"
                    onClick={(e) => {
                      setdeluid(element.UID);
                      setdelid(id);
                      handleShow();
                    }}
                  >
                    Delete
                  </button>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    });
    return items;
  }

  function handleClickSort() {
    setResmsg(null);
    if (startYear === '') {
      setStartYear(0);
      console.log("empty '' value error")
    }
    console.log(startYear);
    console.log(endYear);
    console.log(startCost);
    console.log(endCost);

    if (isActive) {
      if (Department !== "None" && EqpType !== "None") {
        setResmsg("search with range,department,eqp");
        Axios.post("http://localhost:3002/viewasset/range_with_dep_and_eqp", {
          EqpType: EqpType,
          NameOfEqp: NameOfEqp,
          Department: Department,
          startYear: startYear,
          endYear: endYear,
          startCost: startCost,
          endCost: endCost
        }).then((response) => {
          const res = response.data[0];
          setqueriedData(response.data);
          if (res) {
            setResmsg("Total " + response.data.length + " Entries were Found!");
            queriedDatadisplay(queriedData);
            setResmesgcolor("black");
          } else {
            setResmsg("No Data Found!");
            setResmesgcolor("red");
          }
        });
      } else if (EqpType !== "None") {
        setResmsg("search with range and eqp");
        Axios.post("http://localhost:3002/viewasset/range_with_only_eqp", {
          EqpType: EqpType,
          NameOfEqp: NameOfEqp,
          startYear: startYear,
          endYear: endYear,
          startCost: startCost,
          endCost: endCost
        }).then((response) => {
          const res = response.data[0];
          setqueriedData(response.data);
          if (res) {
            setResmsg("Total " + response.data.length + " Entries were Found!");
            queriedDatadisplay(queriedData);
            setResmesgcolor("black");
          } else {
            setResmsg("No Data Found!");
            setResmesgcolor("red");
          }
        });
      } else if (EqpType === "None") {
        setResmsg("search with range and department");
        Axios.post("http://localhost:3002/viewasset/range_with_only_dep", {
          Department: Department,
          startYear: startYear,
          endYear: endYear,
          startCost: startCost,
          endCost: endCost
        }).then((response) => {
          const res = response.data[0];
          setqueriedData(response.data);
          if (res) {
            setResmsg("Total " + response.data.length + " Entries were Found!");
            queriedDatadisplay(queriedData);
            setResmesgcolor("black");
          } else {
            setResmsg("No Data Found!");
            setResmesgcolor("red");
          }
        });
      }
      else {
        //should get all data if Eqptype & dept both are none
        setResmsg("Please Select Filters!");
        setResmesgcolor("red");
      }

      //==========          
    }

    // if dropdown is not active 
    else {
      if (Department !== "None" && EqpType !== "None") {
        Axios.post("http://localhost:3002/viewasset/choose", {
          EqpType: EqpType,
          NameOfEqp: NameOfEqp,
          Department: Department,
        }).then((response) => {
          const res = response.data[0];
          setqueriedData(response.data);
          if (res) {
            setResmsg("Total " + response.data.length + " Entries were Found!");
            queriedDatadisplay(queriedData);
            setResmesgcolor("black");
          } else {
            setResmsg("No Data Found!");
            setResmesgcolor("red");
          }
        });
      } else if (EqpType !== "None") {
        Axios.post("http://localhost:3002/viewasset", {
          EqpType: EqpType,
          NameOfEqp: NameOfEqp,
        }).then((response) => {
          const res = response.data[0];
          setqueriedData(response.data);
          if (res) {
            setResmsg("Total " + response.data.length + " Entries were Found!");
            queriedDatadisplay(queriedData);
            setResmesgcolor("black");
          } else {
            setResmsg("No Data Found!");
            setResmesgcolor("red");
          }
        });
      } else if (EqpType === "None") {
        Axios.post("http://localhost:3002/viewasset/choose2", {
          Department: Department,
        }).then((response) => {
          const res = response.data[0];
          setqueriedData(response.data);
          if (res) {
            setResmsg("Total " + response.data.length + " Entries were Found!");
            queriedDatadisplay(queriedData);
            setResmesgcolor("black");
          } else {
            setResmsg("No Data Found!");
            setResmesgcolor("red");
          }
        });
      }
      else {
        //should get all data if Eqptype & dept both are none
        setResmsg("Please Select Filters!");
        setResmesgcolor("red");
      }
    }
  }


  function handleClick() {
    setResmsg(null);
    if (UID !== "") {
      Axios.get("http://localhost:3002/addasset/" + UID)
        .then(function (response) {
          const res = response.data[0];
          setqueriedData(response.data);
          if (res) {
            setResmsg("Total " + response.data.length + " Entries were Found!");
            queriedDatadisplay(queriedData);
            setResmesgcolor("black");
          } else {
            setResmsg("No Data Found!");
            setResmesgcolor("red");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setResmsg("Enter UID!!");
      setResmesgcolor("red");
    }
  }
  return (
    <div className="navfootpad">
      <Navbar />
      <Row style={{ margin: 0, padding: 0 }}>
        <h1
          style={{
            textAlign: "center",
            paddingLeft: "0",
            paddingRight: "0",
            marginRight: "0",
          }}
        >
          Search Asset
        </h1>
        <hr style={{ margin: 0, padding: 0 }} />
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Record will be deleted permanently!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handeldel}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="formRow">
        <Row style={{ margin: 0, padding: 0 }}>
          <Col xs="9" style={{ margin: 0, paddingRight: 0 }}>
            <InputGroup>
              <InputGroup.Text id="searchAsset">
                <BiSearchAlt />
              </InputGroup.Text>
              <FormControl
                placeholder="Search Using UID"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="text"
                onChange={(e) => {
                  setUID(e.target.value);
                }}
              />
            </InputGroup>
          </Col>
          <Col md="3" style={{ alignItems: "center", textAlign: "center" }}>
            <button className="simplebtn" onClick={handleClick}>
              Go
            </button>
          </Col>
        </Row>
        <hr style={{ padding: 0, marginTop: "20px", marginBottom: "20px" }} />
        <Row style={{ margin: 0, marginTop: "10" }}>
          <Row>
            <Col md="4" style={{ padding: 0, margin: 0 }}>
              <Form.Group controlId="formGridState">
                <Form.Label><b>Equipment type</b></Form.Label>
                <Form.Select
                  required
                  onChange={(e) => {
                    setEqpType(e.target.value);
                  }}
                >
                  {createSelectItems()}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group controlId="formGridState">
                <Form.Label> <b>Name Of Equipment</b> </Form.Label>
                <Form.Select
                  required
                  as="select"
                  onChange={(e) => {
                    setNameOfEqp(e.target.value);
                  }}
                  custom
                >
                  {createSecondItems(EqpType)}
                </Form.Select>
              </Form.Group>
            </Col>


            <Col md="4" style={{ padding: 0, margin: 0 }}>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label><b>Department</b> </Form.Label>
                <Child childToParent={childToParent} />
              </Form.Group>
            </Col>

            <Col md={12}>
              <div className="accordion-title" onClick={() => setIsActive(!isActive)} style={{ textAlign: "center" }}>

                <div>{isActive ? <MdKeyboardArrowUp style={{ color: "#023d77" }} size={30} /> : <MdKeyboardArrowDown style={{ color: "#023d77" }} size={30} />}</div>
              </div>
              {isActive && <Row style={{ margin: 0, marginTop: "10" }}>
                <Col>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={3} style={{ paddingTop: "40px" }}>
                          <b>Year Range :</b>
                        </Col>
                        <Col md={{ span: 3 }}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Start</Form.Label>
                            <Form.Control type="number"
                              onChange={(e) => {
                                setStartYear(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={{ span: 3 }}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>End</Form.Label>
                            <Form.Control type="number"
                              onChange={(e) => {
                                setEndYear(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>


                    <Col>
                      <Row>
                        <Col md={3} style={{ paddingTop: "40px" }}>
                          <b>Cost Range :</b>
                        </Col>
                        <Col md={{ span: 3 }}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Start</Form.Label>
                            <Form.Control type="number"
                              onChange={(e) => {
                                setStartCost(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={{ span: 3 }} >
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>End</Form.Label>
                            <Form.Control type="number"
                              onChange={(e) => {
                                setEndCost(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                      </Row>
                    </Col>


                  </Row>
                </Col>
              </Row>}
            </Col>
          </Row>

          <Col style={{ alignItems: "center", textAlign: "center" }}>
            <button
              style={{ marginTop: "32px" }}
              className="simplebtn"
              onClick={handleClickSort}
            >
              Go
            </button>
          </Col>

        </Row>
        <hr
          className="hrline"
          style={{ padding: 0, marginTop: "20px", marginBottom: "20px" }}
        />

        <p style={{ color: Resmsgcolor, textAlign: "center" }}>{Resmsg}</p>

        {queriedDatadisplay(queriedData)}
      </div>
      <Footer />
    </div>
  );
}

export default ViewAsset;
