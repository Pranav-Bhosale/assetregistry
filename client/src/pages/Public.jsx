import React from "react";
import Footer from "../components/Footer";
import TitleBar from "../components/TitleBar";
import Publicsearch from "./Publicsearch";
import { Row, Tabs, Tab, Col, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function ViewAsset() {
  const history = useHistory();
  const [key, setKey] = React.useState("Search");

  return (
    <div className="navfootpad">
      <TitleBar />

      <div style={{ margin: "30px" }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Search" title="Search Asset">
            <Publicsearch />
          </Tab>
          {/* <Tab eventKey="profile" title="Server"></Tab> */}
          <Tab eventKey="Login" title="Admin Login">
            {key === "Login" && history.push("/admin")}
          </Tab>
          <Tab eventKey="aboutus" title="About">
            {key === "aboutus" && history.push("/about")}
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default ViewAsset;
