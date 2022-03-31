import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {Row,Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateAsset2() {
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <div className="navfootpad">
        <Navbar />
        <Row style={{ margin: 0, padding: 0, }}>
        <h1 style={{ textAlign: 'center', paddingLeft: '0', paddingRight: '0', marginRight: '0' }}>Update Assets</h1>
        <hr style={{ margin: 0, padding: 0, }}/>
      </Row>


        <Form className="formRow" noValidate validated={validated} onSubmit={handleSubmit}>
        <Row style={{paddingBottom:"10px"}}>
        <Form.Group  as={Col} md="6" controlId="validationCustom01">
          <Form.Label>UID</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="UID"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Asset Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Asset Number"
          />
        </Form.Group>
      </Row>



      <Row style={{paddingBottom:"10px"}}>
      <Col md="6" style={{padding:0,margin:0}}>
         <Row style={{padding:0,margin:0}}>
         <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Equipment type</Form.Label>
      <Form.Select required >
        <option>Choose...</option>
        <option>option 1</option>
        <option>option 2</option>
        <option>option 3</option>
      </Form.Select>
    </Form.Group>
        
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Name Of Equipment </Form.Label>
      <Form.Select required as="select" custom>
        <option>Choose...</option>
        <option>...</option>
      </Form.Select>
    </Form.Group>
        </Row>
        </Col>
        <Col md="6" style={{padding:0,margin:0}}>
         <Row style={{padding:0,margin:0}}>
         <Form.Group  as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Specification/Configuration</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Specifications"
          />
        </Form.Group>
       
        </Row>
        </Col>
      </Row>


      <Row style={{paddingBottom:"10px"}}>
       
      </Row>

      <Row style={{paddingBottom:"10px"}}>
       <Col md="6" style={{padding:0,margin:0}}>
       <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>Make</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Make"
          />
        </Form.Group>
        </Col>
        <Col md="6" style={{padding:0,margin:0}}>
        <Form.Group  as={Col} controlId="validationCustom01">
          <Form.Label>Allocation Fund</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Allocation Fund"
          />
        </Form.Group>

        </Col>
      </Row>


      <Row style={{paddingBottom:"10px"}}>
      <Col md="6" style={{padding:0,margin:0}}>
         <Row style={{padding:0,margin:0}}>
        <Form.Group as={Col}  controlId="validationCustom02">
          <Form.Label>Cost Per Unit(Rs)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Cost per unit"
          />
        </Form.Group>
        
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Quantity"
          />
        </Form.Group>
        </Row>
        </Col>
        <Col md="6" style={{padding:0,margin:0}}>
         <Row style={{padding:0,margin:0}}>
        <Form.Group as={Col}  controlId="validationCustom02">
          <Form.Label>Date Of Purchase</Form.Label>
          <Form.Control
            required
            type="date"
          />
        </Form.Group>
        
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Warranty</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Warranty"
          />
        </Form.Group>
        </Row>
        </Col>
      </Row>

      <Row style={{paddingBottom:"10px"}}>
      <Col md="6" style={{padding:0,margin:0}}>
         <Row style={{padding:0,margin:0}}>
         <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Total Cost(Rs)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Total Cost"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Status</Form.Label>
      <Form.Select >
        <option>Choose...</option>
        <option>...</option>
      </Form.Select>
    </Form.Group>
        
        </Row>
        </Col>
        <Col md="6" style={{padding:0,margin:0}}>
        <Form.Group  as={Col}  controlId="validationCustom01">
          <Form.Label> Loaction of Equipment</Form.Label>
          <Form.Control
            required
            type="Text"
            placeholder="Loaction of Equipment"
          />
        </Form.Group>
        </Col>
      </Row>
      <Row style={{paddingBottom:"10px"}}>
        <Form.Group  as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Supplier's Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Supplier Mobile No."
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Supplier's Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Supplier Mobile No."
          />
        </Form.Group>
      </Row>



      <Row style={{paddingBottom:"10px"}}>
      <Form.Group  as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Supplier's Mobile No.</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Supplier Mobile No."
          />
        </Form.Group>
        <Form.Group  as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Utilzation in Hrs/Day</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Utilzation in Hrs/Day"
          />
        </Form.Group>
  
      </Row>



      <Row style={{paddingBottom:"10px"}}>
      <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Remark</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Remark"
          />
        </Form.Group>
        <Form.Group  as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Part</Form.Label>
          <Form.Control
            required
            type="Text"
            placeholder="Part"
          />
        </Form.Group>

      </Row>
      <hr className="hrline"/>
      <br />
      <div style={{textAlign:"center"}}>
      <button  className="lanButton" type="reset">Reset</button>
        <button className="lanButton" type="submit">Save And Next</button>
      </div>
       



    </Form>
        <Footer />
    </div>
  );
}

export default UpdateAsset2;