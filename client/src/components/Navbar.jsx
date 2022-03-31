import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Sidebardata } from './Sidebardata';
import { IconContext } from 'react-icons';
import Logo from './Logo';
import { Container ,Row,Col } from 'react-bootstrap';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const hide =() => setSidebar(false);
  const show =() => setSidebar(true);


  return (
    <>
   <IconContext.Provider value={{ color: '#fff' }}>

   

   <Container fluid  className="navcontainer" style={{paddingLeft:0,paddingRight:0}}>
  <Row style={{padding:0,margin:0}}>
    <Col sm={4}  className="navbarleft" >
         <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar}  onBlur={hide} onFocus={show} style={{paddingTop:"0px"}} />
          </Link>
          <Logo style={{height:"80px",marginTop:"5px",marginBottom:"5px",paddingBottom:"5px"}}/>
    </Col>
    <Col sm={8}  className="navbarright">
             <h1 className="titlenameNav">Asset Registry</h1>
         <h3  className="collegeNameNav" >Walchand College Of Engineering,Sangli</h3>
         <h3  className="aided" >(Government Aided Autonomous Institute)</h3>
    </Col>
  </Row>
</Container>



<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' style={{paddingLeft:'0'}} onClick={showSidebar} onBlur={hide} onFocus={show}>
            {Sidebardata.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{marginLeft:"10px"}}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
   </IconContext.Provider> 
   </> 
   
  );
}

export default Navbar;
