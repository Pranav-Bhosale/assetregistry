import QRCode from "qrcode.react";
import React from "react";
import Logopdf from "../images/logoRed.png";
import { Container, Row, Col } from "react-bootstrap";
import TableFaculty from "../components/TableFaculty";
class ComponentToPrint extends React.PureComponent {
  render() {
    let url = this.props.data.PhotoLink;
    console.log(url);
    return (
      <Container fluid style={{ padding: "50px", textAlign: "center" }}>
        <Row style={{ padding: 0, margin: 0 }}>
          <Col xs="2" style={{ padding: 0, margin: 0 }}>
            {" "}
            <img className="logopdf" src={Logopdf} alt="Logo" />{" "}
          </Col>

          <Col xs="8" style={{ padding: 0, margin: 0 }}>
            <h2 style={{ fontWeight: "bolder" }}>
              Walchand College Of Engineering,Sangli
            </h2>
            <h5>(Government Aided Autonomous Institute)</h5>
          </Col>

          <Col xs="2" style={{ padding: 0, margin: 0 }}>
            {" "}
          </Col>
        </Row>
        <Row style={{ paddingTop: "60px", margin: 0 }}>
          <h2>
            <b>Asset Register</b>
          </h2>
          <h5>UID : {this.props.data.UID}</h5>
        </Row>
        <br />
        <TableFaculty
          uid={this.props.data.UID}
          department={this.props.data.Department}
          assetNo={this.props.data.AssetNumber}
          equipType={this.props.data.EqpType}
          nameEquip={this.props.data.NameOfEqp}
          specsConfig={this.props.data.SpecsConfig}
          make={this.props.data.Make}
          allocationFund={this.props.data.AllocationFund}
          dop={this.props.data.DOP}
          costPerUnit={this.props.data.CostPerUnit}
          quantity={this.props.data.Quantity}
          totaolCost={this.props.data.TotalCost}
          warranty={this.props.data.Warranty}
          location={this.props.data.LocEqp}
          supplier={this.props.data.SupplierName}
          supplierEmail={this.props.data.SupplierAddress}
          supplierMobNo={this.props.data.SupplierMobNo}
          utilization={this.props.data.Utilization}
          status={this.props.data.Status}
          remark={this.props.data.Remark}
          part={this.props.data.Part}
          PhotoLink={this.props.data.PhotoLink}
        />
        <br />
        <br />
        <Row>
          <Col>
            <QRCode
              id="qrcode"
              value={this.props.reqpath}
              renderAs="svg"
              includeMargin={true}
            />
          </Col>
          {/* <Col>
            <img
              src={url}
              style={{ width: "250px", height: "150px" }}
              alt="Asset Image"
            />
          </Col> */}
        </Row>
        {/* <h5>QR Code</h5>
        <QRCode
          id="qrcode"
          value={this.props.reqpath}
          renderAs="svg"
          includeMargin={true}
        /> */}
      </Container>
    );
  }
}
export default ComponentToPrint;
