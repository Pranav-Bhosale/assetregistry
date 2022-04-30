import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Row, Tabs, Tab, Col, Form } from "react-bootstrap";
import Axios from "axios";
import fileDownload from "js-file-download";
import { Redirect } from "react-router-dom";
import Child from "./DeptDropdown";

function ImportExportCSV() {
  const [uploadedFile, setuploadedFile] = React.useState(null);
  const [Resmsg, setResmsg] = React.useState(null);
  const [Resmsgexport, setResmsgexport] = React.useState(null);
  const [key, setKey] = React.useState("Upload");
  const [Department, setDepartment] = React.useState("All"); //set the dept......

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
  function childToParent(deptstring) {
    setDepartment(deptstring);
  }
  const handelUpload = (event) => {
    setResmsg(null);
    event.preventDefault();
    event.stopPropagation();
    if (uploadedFile) {
      const data = new FormData();
      data.append("fileInput", uploadedFile);
      data.append("Department", Department);
      Axios.post("http://localhost:3002/importCSV", data)
        .then((response) => {
          setResmsg(response.data);
        })
        .catch(function (error) {
          setuploadedFile(null);
          document.getElementById("csvinputform").reset();
          setResmsg(
            "Uploaded file changed or Netwok Issue...Re-input file and try again"
          );
        });
    } else {
      setResmsg("Add File To Upload!!");
    }
  };

  function getalldata() {
    setResmsgexport("Wait..file will be downloaded soon!!");
    Axios.get("http://localhost:3002/alldata")
      .then(function (response) {
        console.log(response);
        fileDownload(response.data, "WCE_AssetRegister.csv");
        setResmsgexport("File has downloaded..");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className="navfootpad">
        <Navbar />
        <div style={{ margin: "30px" }}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="Upload" title="Upload">
              <Row style={{ margin: 0, padding: 0 }}>
                <h1
                  style={{
                    textAlign: "center",
                    paddingLeft: "0",
                    paddingRight: "0",
                    marginRight: "0",
                  }}
                >
                  Add CSV File To Database
                </h1>
                <hr style={{ margin: 0, padding: 0 }} />
              </Row>
              <div style={{ textAlign: "center" }}>
                <Form
                  className="formRow"
                  onSubmit={handelUpload}
                  id="csvinputform"
                  encType="multipart/form-data"
                >
                  <Row>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>
                        <h6>
                          <b>Select Department</b>{" "}
                        </h6>
                      </Form.Label>
                      <Child childToParent={childToParent} />
                    </Form.Group>

                    <Col>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>
                          <h6>
                            <b>Choose a CSV file</b>
                          </h6>
                        </Form.Label>
                        <Form.Control
                          type="file"
                          accept=".csv"
                          onChange={(e) => {
                            setuploadedFile(e.target.files[0]);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <br />
                  </Row>
                  <button className="lanButton" type="submit">
                    Upload
                  </button>
                </Form>

                <p style={{ textAlign: "center" }}>{Resmsg}</p>
                <hr
                  className="hrline"
                  style={{
                    padding: 0,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </Tab>

            <Tab eventKey="Download" title="Download">
              <Row style={{ margin: 0, padding: 0 }}>
                <h1
                  style={{
                    textAlign: "center",
                    paddingLeft: "0",
                    paddingRight: "0",
                    marginRight: "0",
                  }}
                >
                  Get All Data From Database
                </h1>
              </Row>

              <div style={{ textAlign: "center" }}>
                <button className="lanButton" onClick={getalldata}>
                  Get Data
                </button>
                <p style={{ textAlign: "center" }}>{Resmsgexport}</p>
              </div>
            </Tab>
          </Tabs>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ImportExportCSV;
