import React from "react";
import { Row, Col, Card, Accordion,Modal,Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { BiSearchAlt } from "react-icons/bi";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import {Redirect,useHistory} from "react-router-dom";
import Axios from "axios";


function Publicsearch() {
  const history=useHistory();
  const [redirect,setRedirect]=React.useState(false);
  const [redirectUpdate,setRedirectUpdate]=React.useState(false);
  const [redirectUID,setRedirectUID]=React.useState(null);
  const [UID ,setUID]= React.useState(null);
  const [Resmsg ,setResmsg]= React.useState(null);
  const [Resmsgcolor,setResmesgcolor]=React.useState("black");
  const [EqpType, setEqpType] = React.useState("Camera");
  const [NameOfEqp, setNameOfEqp] = React.useState("Web");
  const [Department, setDepartment] = React.useState("None");
  const[queriedData,setqueriedData]=React.useState([]);
const[deluid,setdeluid]=React.useState(null);
const[delid,setdelid]=React.useState(null);
 
  

 

  const [show, setShow] = React.useState(false);
  const handleClose = () =>{ setShow(false)};
  const handleShow = () => setShow(true);

  function handeldel()
  {
    var id=delid;
    var uid=deluid
    Axios.post("https://wce-asset-registry.herokuapp.com/deleteasset",{
    UID:uid
}).then((response)=>{
if(response.data.success)
  {
    document.getElementById(id).remove();
    setdelid(null);
    setdeluid(null);
    handleClose();
  }   
});
    
   
  }

  const dropdownlist={
    Camera:["Web","Analog","IP Based",	"Other"],
    Computer:["Laptop","Desktop","Server",	"Other"],
    Monitor	:["LCD",	"TFT"	,"LED"	,"Other"],
    MFD:	["Laser Printer+Scanner",	"Inkjet Printer+Scanner"	,"Other"],
    Network_Device:["Router"	,"Switch"	,"DVR"	,"NVR"	,"Wi-Fi", "Access Point",	"Other"],
    Printer:	["Inject" ,	"Laser",	"Dot Matrix",	"Other"],
    Scanner:	["Flat", "Bed","Other"]	,
    UPS:	["500 VA"	, "1 KVA",	"Other"],
   Software:[	"System(OS)",	"Application"	,"Other"],
   Other:	["Projector",	"Xerox Machine"	,	"Other"],
   None:["None"]
 }

 if (redirect) {
  history.push("/infoall/"+redirectUID);
// var routstring="/infoall/"+ redirectUID;
//   return <Redirect to={routstring} />
  // return <Redirect to={{
  //   pathname:
  // }} />
}

function  createSelectItems() {
   let items = [];         
   for (const key of Object.keys(dropdownlist)) {             
        items.push(<option key={key}>{key}</option>);   
   }
   return items;
}  

function  createSecondItems(val) {
 let items = [];
 const list =dropdownlist[val];        
 list.forEach(element =>  {             
      items.push(<option key={element}>{element}</option>);   
 });
 return items;
} 

function  queriedDatadisplay(queriedData) {
  var data=queriedData;
  let items = [];
  let n=0;
  data.forEach(element =>  {
    n++
    var id=n;
       items.push(
        <Accordion id={id} key={n} defaultActiveKey="1"  >
        <Accordion.Item eventKey="0"  border="primary" style={{ textAlign:"center", backgrounColor:"#F0FFFF", marginBottom:"30px"}}  > 
         <p style={{display:"flex",top:0,left:5,padding:0,margin:0}}>{n}</p>
          <Accordion.Header>
          <Card className="text-center" style={{width:"100%", textAlign:"center"}}>
                <Card.Header>
                
                <Row> 
                <Col md="6">
                  UID&nbsp;:&nbsp;{element.UID}<hr></hr>
                </Col>
                <Col md="6">
                Asset Number&nbsp;:&nbsp;{element.AssetNumber}<hr></hr>
                </Col>
                </Row>
                <Row> 
                <Col md="6">
                Equipment Type&nbsp;:&nbsp;{element.EqpType}<hr></hr>
                </Col>
                <Col md="6">
                Name of Equipment&nbsp;:&nbsp;{element.NameOfEqp}<hr></hr>
                
                </Col>
                </Row></Card.Header>
              
              </Card>
          </Accordion.Header>
          <Accordion.Body  border="primary"  >
          <Row >
                  <Col>
                  <button className="simplebtn" onClick={(e)=>{
                     setRedirectUID(element.UID);
                     setRedirect(true);
                     }}>View</button>
          
                  </Col>
                 
                  </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

       );   
  });
  return items;
  
 } 
 












  function handleClickSort(){
    setResmsg(null);

    if(Department!=="None"&&EqpType!=="None"){
      Axios.post("https://wce-asset-registry.herokuapp.com/viewasset/choose",{
        EqpType:EqpType,
        NameOfEqp:NameOfEqp,
        Department:Department
      }).then((response)=>{
        const res=response.data[0];
        setqueriedData(response.data);
        if(res){
          setResmsg("Total "+response.data.length+" Entries Found!");
          queriedDatadisplay(queriedData);
          setResmesgcolor("black");
          }
          else{
            setResmsg("No Data Found!");
            setResmesgcolor("red");
            }
      });
    }
    else if( EqpType!=="None"){
      Axios.post("https://wce-asset-registry.herokuapp.com/viewasset",{
        EqpType:EqpType,
        NameOfEqp:NameOfEqp
      }).then((response)=>{
        const res=response.data[0];
        setqueriedData(response.data);
        if(res){
          setResmsg("Total "+response.data.length+" Entries Found!");
          queriedDatadisplay(queriedData);
          setResmesgcolor("black");
          }
          else{
            setResmsg("No Data Found!");
            setResmesgcolor("red");
            }
      });
    }
    else if(EqpType==="None"){
      Axios.post("https://wce-asset-registry.herokuapp.com/viewasset/choose2",{
        Department:Department
      }).then((response)=>{
        const res=response.data[0];
        setqueriedData(response.data);
        if(res){
          setResmsg("Total "+response.data.length+" Entries Found!");
          queriedDatadisplay(queriedData);
          setResmesgcolor("black");
          }
          else{
            setResmsg("No Data Found!");
            setResmesgcolor("red");
            }
      });
    }
    else{
      setResmsg("Please Select Filters!");
            setResmesgcolor("red");
    }
  }

  function handleClick(){
    setResmsg(null);
    if(UID!==""){
    Axios.get('https://wce-asset-registry.herokuapp.com/addasset/'+UID)
  .then(function (response) {
    const res=response.data[0];
    setqueriedData(response.data);
    if(res){
      setResmsg("Total "+response.data.length+" Entries Found!");
      queriedDatadisplay(queriedData);
     setResmesgcolor("black");
    }
    else{
    setResmsg("No Data Found!");
    setResmesgcolor("red");
    }
  })
  .catch(function (error) {
    console.log(error);
  });
    }
    else {
      setResmsg("Enter UID!!");
      setResmesgcolor("red");
    }
    
  }


 



  return (
    <>
      <Row style={{ margin: 0, padding: 0, }}>
        <h1 style={{ textAlign: 'center', paddingLeft: '0', paddingRight: '0', marginRight: '0' }}>Search Asset</h1>
        <hr  style={{ margin: 0, padding: 0, }}/>
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

        <Row style={{ margin: 0, padding: 0, }} >
          <Col xs="9"  style={{ margin: 0, paddingRight: 0, }}>

            <InputGroup >
              <InputGroup.Text id="searchAsset"><BiSearchAlt /></InputGroup.Text>
              <FormControl
                placeholder="Search Using UID"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="number"
                onChange={(e) => {setUID(e.target.value)}}
              />
            </InputGroup>
          </Col>
          <Col xs="3" style={{alignItems:"center", textAlign:"center"}}>
            <button className="simplebtn" onClick={handleClick}>Go</button>
          </Col>
        </Row>
        <hr style={{ padding: 0, marginTop: '20px',marginBottom: '20px' }}/>
        <Row style={{ margin: 0, marginTop:'10', }}>
          <Col md="6" style={{ padding: 0, margin: 0 }}>
            <Row style={{ padding: 0, margin: 0 }}>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Equipment type</Form.Label>
                <Form.Select required onChange={(e) => {setEqpType(e.target.value)}} >
                {createSelectItems()}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Name Of Equipment </Form.Label>
                <Form.Select required as="select" onChange={(e) => {setNameOfEqp(e.target.value)}} custom>
                {createSecondItems(EqpType)}
                </Form.Select>
              </Form.Group>
            </Row>
          </Col>
          <Col md="6" style={{ padding: 0, margin: 0 }}>
          <Row  style={{ padding: 0, margin: 0 }}>
          <Col style={{ margin: 0, paddingRight: 0, }}>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Department </Form.Label>
                <Form.Select required as="select" onChange={(e) => {setDepartment(e.target.value)}}  custom>
                  <option>ALL</option>
                  <option>IT</option>
                  <option>CS</option>
                  <option>CV</option>
                  <option>EL</option>
                  <option>ET</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col  style={{alignItems:"center", textAlign:"center"}}>
             <button style={{marginTop:"20px"}}className="simplebtn" onClick={handleClickSort}>Go</button>
            </Col>
         </Row>
         </Col>
        </Row>
        <hr className="hrline" style={{ padding: 0, marginTop: '20px',marginBottom: '20px' }}/>
      
      <p style={{color:Resmsgcolor, textAlign:"center"}}>{Resmsg}</p>


{queriedDatadisplay(queriedData)}

      </div>
      </>
  );
}

export default Publicsearch;