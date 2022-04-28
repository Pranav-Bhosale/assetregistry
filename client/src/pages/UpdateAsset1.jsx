import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

function ViewAsset(props) {
  const reqpath = window.location.origin + "/info/" + props.match.params.UID;
  const [uidval, setuidval] = React.useState(null);
  const [data, setdata] = React.useState(null);

  const [redirect, setRedirect] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [UID, setUID] = React.useState(null);
  const [AssetNumber, setAssetNumber] = React.useState(null);
  const [EqpType, setEqpType] = React.useState("Camera");
  const [NameOfEqp, setNameOfEqp] = React.useState("Web");
  const [SpecsConfig, setSpecsConfig] = React.useState(null);
  const [Make, setMake] = React.useState(null);
  const [AllocationFund, setAllocationFund] = React.useState(null);
  const [DOP, setDOP] = React.useState(null);
  const [CostPerUnit, setCostPerUnit] = React.useState(null);
  const [Quantity, setQuantity] = React.useState(null);
  const [TotalCost, setTotalCost] = React.useState(null);
  const [Warranty, setWarranty] = React.useState(null);
  const [LocEqp, setLocEqp] = React.useState(null);
  const [SupplierName, setSupplierName] = React.useState(null);
  const [SupplierAddress, setSupplierAddress] = React.useState(null);
  const [SupplierMobNo, setSupplierMobNo] = React.useState(null);
  const [Utilization, setUtilization] = React.useState(null);
  const [Status, setStatus] = React.useState(null);
  const [Remark, setRemark] = React.useState(null);
  const [Part, setPart] = React.useState(null);
  const [Resmsg, setResmsg] = React.useState(null);
  const [Department, setDepartment] = React.useState("None");

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
  };

  React.useEffect(() => {
    if (data) {
      setDepartment(data.Department);
      setUID(data.UID);
      setEqpType(data.EqpType);
      setNameOfEqp(data.NameOfEqp);
      setStatus(data.Status);
      console.log(Status);
      createStatusItems();
      setSpecsConfig(data.SpecsConfig);
      setAssetNumber(data.AssetNumber);
      setMake(data.Make);
      setAllocationFund(data.AllocationFund);
      setDOP(data.DOP);
      setCostPerUnit(data.CostPerUnit);
      setQuantity(data.Quantity);
      setWarranty(data.Warranty);
      setTotalCost(data.TotalCost);
      setLocEqp(data.LocEqp);
      setSupplierName(data.SupplierName);
      setSupplierAddress(data.SupplierAddress);
      setUtilization(data.Utilization);
      setPart(data.Part);
      setRemark(data.Remark);
      setSupplierMobNo(data.SupplierMobNo);
    }
  }, [data]);

  React.useEffect(() => {
    Axios.get(
      "http://localhost:3002/addasset/" +
        props.match.params.UID
    )
      .then(function (response) {
        console.log(response.data[0]);
        setdata(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function createSelectItems() {
    let items = [];
    for (const key of Object.keys(dropdownlist)) {
      if (key == data.EqpType)
        items.push(
          <option key={key} selected={true}>
            {key}
          </option>
        );
      else items.push(<option key={key}>{key}</option>);
    }
    return items;
  }
  function createStatusItems() {
    let items = [];

    if ("Working" == Status) {
      items.push(
        <option key={1} selected={true}>
          Working
        </option>
      );
      items.push(<option key={2}>Not Working</option>);
    } else {
      items.push(<option key={1}>Working</option>);
      items.push(
        <option key={2} selected={true}>
          Not Working
        </option>
      );
    }

    return items;
  }
  function createSecondItems(val) {
    let items = [];
    const list = dropdownlist[val];
    list.forEach((element) => {
      if (element == data.NameOfEqp) {
        items.push(
          <option key={element} selected={true}>
            {element}
          </option>
        );
      } else items.push(<option key={element}>{element}</option>);
    });
    return items;
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/addAsset2/" + UID,
          // state:{UID:UID}
        }}
      />
    );
  }

  const postreq = () => {
    Axios.post("https://wce-asset-registry.herokuapp.com/addasset", {
      Department: Department,
      //UID: UID,
      AssetNumber: AssetNumber,
      EqpType: EqpType,
      NameOfEqp: NameOfEqp,
      SpecsConfig: SpecsConfig,
      Make: Make,
      AllocationFund: AllocationFund,
      DOP: DOP,
      CostPerUnit: CostPerUnit,
      Quantity: Quantity,
      TotalCost: TotalCost,
      Warranty: Warranty,
      LocEqp: LocEqp,
      SupplierName: SupplierName,
      SupplierAddress: SupplierAddress,
      SupplierMobNo: SupplierMobNo,
      Utilization: Utilization,
      Status: Status,
      Remark: Remark,
      Part: Part,
    }).then((response) => {
      if (response.data.err) {
        const msg = "Error Adding Data ErrorCode:" + response.data.code;
        setResmsg(msg);
      } else {
        setResmsg(null);
        setValidated(false);
        document.getElementById("addassetform").reset();
        setRedirect(true);
      }
    });
  };

  const handleSubmit = (event) => {
    setResmsg(null);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setResmsg("Invalid Data");
    } else {
      setValidated(true);
      setResmsg("Valid Data");
    }
  };

  if (uidval && data) {
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
            Update Asset
          </h1>
          <hr style={{ margin: 0, padding: 0 }} />
        </Row>
        <Form
          className="formRow"
          id="addassetform"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row style={{ paddingBottom: "10px" }}>
            <Col>
              <Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Department </Form.Label>
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

                <Form.Group as={Col} controlId="formFile" className="mb-3">
                  <Form.Label>Choose Image</Form.Label>
                  <Form.Control type="file" accept="image/*" />
                </Form.Group>
              </Row>
            </Col>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Asset Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Asset Number"
                value={AssetNumber}
                onChange={(e) => setAssetNumber(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row style={{ paddingBottom: "10px" }}>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Row style={{ padding: 0, margin: 0 }}>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Equipment type</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setEqpType(e.target.value)}
                  >
                    {createSelectItems()}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Name Of Equipment </Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => {
                      setNameOfEqp(e.target.value);
                    }}
                    custom
                  >
                    {createSecondItems(EqpType)}
                  </Form.Select>
                </Form.Group>
              </Row>
            </Col>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Row style={{ padding: 0, margin: 0 }}>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Specification/Configuration</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={SpecsConfig}
                    placeholder="Specifications"
                    onChange={(e) => setSpecsConfig(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Col>
          </Row>

          <Row style={{ paddingBottom: "10px" }}></Row>

          <Row style={{ paddingBottom: "10px" }}>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Make</Form.Label>
                <Form.Control
                  required
                  value={Make}
                  type="text"
                  placeholder="Make"
                  onChange={(e) => setMake(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>Allocation Fund</Form.Label>
                <Form.Control
                  value={AllocationFund}
                  required
                  type="text"
                  placeholder="Allocation Fund"
                  onChange={(e) => setAllocationFund(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ paddingBottom: "10px" }}>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Row style={{ padding: 0, margin: 0 }}>
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label>Cost Per Unit(Rs)</Form.Label>
                  <Form.Control
                    value={CostPerUnit}
                    required
                    type="number"
                    placeholder="Cost per unit"
                    onChange={(e) => setCostPerUnit(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    value={Quantity}
                    required
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Col>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Row style={{ padding: 0, margin: 0 }}>
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label>Date Of Purchase</Form.Label>
                  <Form.Control
                    value={DOP}
                    required
                    type="date"
                    onChange={(e) => setDOP(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label>Warranty</Form.Label>
                  <Form.Control
                    value={Warranty}
                    required
                    type="number"
                    placeholder="Warranty"
                    onChange={(e) => setWarranty(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Col>
          </Row>

          <Row style={{ paddingBottom: "10px" }}>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Row style={{ padding: 0, margin: 0 }}>
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label>Total Cost(Rs)</Form.Label>
                  <Form.Control
                    value={TotalCost}
                    required
                    type="number"
                    placeholder="Total Cost"
                    onChange={(e) => setTotalCost(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {createStatusItems()}
                  </Form.Select>
                </Form.Group>
              </Row>
            </Col>
            <Col md="6" style={{ padding: 0, margin: 0 }}>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label> Loaction of Equipment</Form.Label>
                <Form.Control
                  value={LocEqp}
                  required
                  type="Text"
                  placeholder="Loaction of Equipment"
                  onChange={(e) => setLocEqp(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "10px" }}>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Supplier's Name</Form.Label>
              <Form.Control
                value={SupplierName}
                required
                type="text"
                placeholder="Supplier's Name"
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Supplier's Email</Form.Label>
              <Form.Control
                value={SupplierAddress}
                required
                type="email"
                placeholder="Supplier's Email "
                onChange={(e) => setSupplierAddress(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row style={{ paddingBottom: "10px" }}>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Supplier's Mobile No.</Form.Label>
              <Form.Control
                value={SupplierMobNo}
                required
                type="number"
                placeholder="Supplier Mobile No."
                onChange={(e) => setSupplierMobNo(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Utilzation in Hrs/Day</Form.Label>
              <Form.Control
                value={Utilization}
                required
                type="text"
                placeholder="Utilzation in Hrs/Day"
                onChange={(e) => setUtilization(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row style={{ paddingBottom: "10px" }}>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                value={Remark}
                required
                type="text"
                placeholder="Remark"
                onChange={(e) => setRemark(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Part</Form.Label>
              <Form.Control
                value={Part}
                required
                type="Text"
                placeholder="Part"
                onChange={(e) => setPart(e.target.value)}
              />
            </Form.Group>
          </Row>
          <hr className="hrline" />
          <br />
          <p style={{ textAlign: "center" }}>{Resmsg}</p>
          <div style={{ textAlign: "center" }}>
            <button className="lanButton" type="submit">
              Save And Next
            </button>
          </div>
        </Form>
        <Footer />
      </div>
    );
  } else {
    return null;
  }
}

export default ViewAsset;
