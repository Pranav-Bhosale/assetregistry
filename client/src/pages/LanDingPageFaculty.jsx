import React from "react";
import { Container ,Row,Col } from "react-bootstrap";
import LanLeft from "../components/LanLeft";
import LanRightFAculty from "../components/LanRightFAculty"; 

function LanDingPageFaculty(props) {
  return (
    <Container fluid style={{padding:0,margin:0}}>
    <Row style={{padding:0,margin:0}}>
      <Col style={{padding:0,margin:0}} md={6}> <LanLeft /></Col>
      <Col style={{padding:0,margin:0}} md={6}><LanRightFAculty uid={props.location.state} /> </Col>
    </Row>
  </Container>
  );
}

export default LanDingPageFaculty;