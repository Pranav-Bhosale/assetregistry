import React from "react";
import RangeSlider from "./RangeSlider";
import { Container ,Row,Col } from "react-bootstrap";
import QRCode from 'qrcode.react';
import * as svg from 'save-svg-as-png';

function Qr(props) {
   const[size,setSize]=React.useState(65);
    function downloadQr()
    {
        svg.saveSvgAsPng(document.getElementById("qrcode"),props.name, {scale:1+size/25});
    }
  return (
    <Container fluid style={{padding:0,marginTop:0,}} className="Qr">
      <Row style={{padding:0,margin:0}} >
        <Col style={{padding:0,margin:0}} xs={7} >
        <div className="qr-code">
        <h3 className="Qr-title">QR Code </h3>
           <QRCode id="qrcode" value={props.value} renderAs='svg' includeMargin={true} size={size}/>
        </div>
        <button  onClick={downloadQr} className="lanButton">Download QR Code</button>  
        </Col>
        <Col style={{padding:0,margin:0}} xs={5}>
          <p className="sizeText">Adjust Size</p>
          <p className="scaletext" >(Scales in cm)</p>
         <RangeSlider setSize={setSize} size={size}/>
        </Col>
      </Row>
    </Container>

  );
}

export default Qr;