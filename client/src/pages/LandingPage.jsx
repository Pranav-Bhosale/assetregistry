import React from "react";
import { Container ,Row,Col } from "react-bootstrap";
import LanLeft from "../components/LanLeft";
import LanRight from "../components/LanRight"; 

function LandingPage() {
  
  return (
    <Container fluid style={{padding:0,margin:0}}>
      <Row style={{padding:0,margin:0}}>
        <Col style={{padding:0,margin:0}} md={6}> <LanLeft /></Col>
        <Col style={{padding:0,margin:0}} md={6}><LanRight /> </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
