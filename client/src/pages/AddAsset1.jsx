import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Logo from "../components/Logo";
import Child from "./DeptDropdown";

function ViewAsset() {
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
  const [Status, setStatus] = React.useState("Working");
  const [Remark, setRemark] = React.useState(null);
  const [Part, setPart] = React.useState(null);
  const [Resmsg, setResmsg] = React.useState(null);
  const [Department, setDepartment] = React.useState("All");
  const [uploadedFile, setuploadedFile] = React.useState(null);
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

  useEffect(() => {
    console.log(Department);
  }, [Department]);

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

  function createSelectItems() {
    let items = [];
    for (const key of Object.keys(dropdownlist)) {
      items.push(<option key={key}>{key}</option>);
    }
    return items;
  }

  function childToParent(deptstring) {
    setDepartment(deptstring);
  }

  if (!logedIN) {
    return <Redirect to="/admin" />;
  }

  function createSecondItems(val) {
    let items = [];
    const list = dropdownlist[val];
    list.forEach((element) => {
      items.push(<option key={element}>{element}</option>);
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
  function resetform() {
    setResmsg(null);
    setValidated(false);
    document.getElementById("addassetform").reset();
  }

  // const singleFileUploadHandler = (event) => {

  //   // If file selected
  // };

  async function handleSubmit(event) {
    setResmsg(null);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setResmsg("Invalid Data");
    } else {
      setValidated(true);
      var link;

      if (uploadedFile) {
        const data = new FormData();
        data.append("profileImage", uploadedFile, uploadedFile.name);
        await Axios.post("http://localhost:3002/photodept", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
          .then((response) => {
            if (200 === response.status) {
              if (response.data.error) {
                if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                  setResmsg("File size Exceeded");
                } else {
                  setResmsg(response.data.error);
                }
              } else {
                link = response.data.location;
                console.log("filedata", response.data);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(Department);
        await Axios.post("http://localhost:3002/deptinfo", {
          Department: Department,
        }).then((response) => {
          console.log(response);
          if (response.status == 201) {
            var a = Department + response.data[0].No;
            var number = response.data[0].No + 1;
            console.log(a);
            setUID(a);
            Axios.post("http://localhost:3002/addasset", {
              Department: Department,
              UID: a,
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
              PhotoLink: link,
            }).then((response) => {
              if (response.data.err) {
                const msg = "Error Adding Data ErrorCode:" + response.data.code;
                setResmsg(msg);
              } else {
                Axios.post("http://localhost:3002/deptincrement", {
                  Department: Department,
                  number: number,
                }).then((response) => {
                  console.log(response);
                  if (response.status == 201) {
                    setResmsg(null);
                    setValidated(false);
                    document.getElementById("addassetform").reset();
                    setRedirect(true);
                  } else {
                    const msg = "Error in Incrementing UID";
                    setResmsg(msg);
                  }
                });
              }
            });
          } else {
            const msg =
              "Error Adding Data ErrorCode:" + response.data.err.message;
            setResmsg(msg);
          }
        });
      } else {
        console.log(Department);
        await Axios.post("http://localhost:3002/deptinfo", {
          Department: Department,
        }).then((response) => {
          console.log(response);
          if (response.status == 201) {
            var a = Department + response.data[0].No;
            var number = response.data[0].No + 1;
            console.log(a);
            setUID(a);
            Axios.post("http://localhost:3002/addasset", {
              Department: Department,
              UID: a,
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
              PhotoLink: link,
            }).then((response) => {
              if (response.data.err) {
                const msg = "Error Adding Data ErrorCode:" + response.data.code;
                setResmsg(msg);
              } else {
                Axios.post("http://localhost:3002/deptincrement", {
                  Department: Department,
                  number: number,
                }).then((response) => {
                  console.log(response);
                  if (response.status == 201) {
                    setResmsg(null);
                    setValidated(false);
                    document.getElementById("addassetform").reset();
                    setRedirect(true);
                  } else {
                    const msg = "Error in Incrementing UID";
                    setResmsg(msg);
                  }
                });
              }
            });
          } else {
            const msg =
              "Error Adding Data ErrorCode:" + response.data.err.message;
            setResmsg(msg);
          }
        });
      }

      // if (uploadedFile) {
      //   const data = new FormData();
      //   data.append("fileInput", uploadedFile);
      //   Axios.post("http://localhost:3002/photodept", data)
      //     .then((response) => {
      //       console.log(response);
      //       try {
      //         fetch(response.data.url, {
      //           method: "PUT",
      //           headers: {
      //             "Content-Type": "image/*",
      //           },
      //           body: data,
      //         }).then((resp) => {
      //           console.log(resp);
      //         });
      //       } catch (e) {
      //         console.log(e);
      //       }
      //       const imageUrl = response.data.url.split("?")[0];
      //       console.log(imageUrl);
      //       link = imageUrl;
      //     })
      //     .catch(function (error) {
      //       console.log(error); // setuploadedFile(null);
      //       // document.getElementById("csvinputform").reset();
      //       // setResmsg(
      //       //   "Uploaded file changed or Netwok Issue...Re-input file and try again"
      //       // );
      //     });
      // }
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
          Add Asset
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
                <Child childToParent={childToParent} />
              </Form.Group>

              <Form.Group as={Col} controlId="formFile" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setuploadedFile(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </Row>
          </Col>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Asset Number</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Asset Number"
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
                  as="select"
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
                  required
                  type="number"
                  placeholder="Cost per unit"
                  onChange={(e) => setCostPerUnit(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
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
                  required
                  type="date"
                  onChange={(e) => setDOP(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Warranty</Form.Label>
                <Form.Control
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
                  <option>Working</option>
                  <option>Not Working</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Col>
          <Col md="6" style={{ padding: 0, margin: 0 }}>
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label> Loaction of Equipment</Form.Label>
              <Form.Control
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
              required
              type="text"
              placeholder="Supplier's Name"
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Supplier's Email</Form.Label>
            <Form.Control
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
              required
              type="number"
              placeholder="Supplier Mobile No."
              onChange={(e) => setSupplierMobNo(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Utilzation in Hrs/Day</Form.Label>
            <Form.Control
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
              required
              type="text"
              placeholder="Remark"
              onChange={(e) => setRemark(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Part</Form.Label>
            <Form.Control
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
          <button className="lanButton" onClick={resetform}>
            Reset
          </button>
          <button className="lanButton" type="submit">
            Save And Next
          </button>
        </div>
      </Form>
      <Footer />
    </div>
  );
}

export default ViewAsset;
