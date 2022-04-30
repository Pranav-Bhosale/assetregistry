import React from 'react'
import Form from 'react-bootstrap/Form'
import {Row,Col } from "react-bootstrap";
import Axios from "axios";
export default function Child({childToParent}) {
    
const [departmentdata,setDepartmentdata]=React.useState([]);
const [dataarray,setdataarray]=React.useState([]);

function  createSelectItems() {
    let items = [];         
    departmentdata.map((item) =>
        items.push(<option key={item}>{item}</option>)
      );
    return items;
 }  
 let ar=[];
    React.useEffect(() => {
        
        Axios.get("http://localhost:3002/alldeptinfo")
        .then(function (response){
          console.log(response);
            response.data.forEach(element => {
              ar.push(element.deptName );
            });
            console.log(ar);
            setdataarray(ar);
            

            Axios.get("http://localhost:3002/userdetails")
            .then(function (response) {
              console.log(response);
              // const res = response.data[0];
              if(response.status==201){
            //    console.log(response);
            let array=[];
               switch (response.data.dep) {
                case "ALL":
                   setDepartmentdata(ar);
                  childToParent("Lib");
                  break;
                case "IT":
                   
                    setDepartmentdata(arr=> [...arr,'IT']);
                    childToParent("IT");
                    break;
                case "CSE":
                    setDepartmentdata(arr=> [...arr,'CSE']);
                    childToParent("CSE");
                    break;
                case "CIVIL":
                setDepartmentdata(arr=> [...arr,'CIVIL']);
                childToParent("CIVIL");
                break;

                case "ELECTRICAL":
                setDepartmentdata(arr=> [...arr,'ELECTRICAL']);
                childToParent("ELECTRICAL");
                break; 

                case "ELECTRONICS":
                    setDepartmentdata(arr=> [...arr,'ELECTRONICS']);
                    childToParent("ELECTRONICS");
                    break;
                case "MECHANICAL":
                    setDepartmentdata(arr=> [...arr,'MECHANICAL']);
                    childToParent("MECHANICAL");
                    break;
              }
              }
              else if(response.status==260){
                setDepartmentdata(ar);
                childToParent("Lib");
              }
              else{
                console.log("error fetching user info");
              }
            })
            .catch(function (error) {
              console.log(error);
            });






        }).catch(function (error) {
          console.log(error);
        });

        
          // Axios.get("http://localhost:3002/userdetails")
          //   .then(function (response) {
      
          //     // const res = response.data[0];
          //     if(response.status==201){
          //   //    console.log(response);
          //   let array=[];
          //      switch (response.data.dep) {
          //       case "ALL":
          //          setDepartmentdata(dataarray);
          //         childToParent("Lib");
          //         break;
          //       case "IT":
          //           array.push('IT')
          //           setDepartmentdata(arr=> [...arr,'IT']);
          //           childToParent("IT");
          //           break;
          //       case "CSE":
          //           setDepartmentdata(arr=> [...arr,'CSE']);
          //           childToParent("CSE");
          //           break;
          //       case "CIVIL":
          //       setDepartmentdata(arr=> [...arr,'CIVIL']);
          //       childToParent("CIVIL");
          //       break;

          //       case "ELECTRICAL":
          //       setDepartmentdata(arr=> [...arr,'ELECTRICAL']);
          //       childToParent("ELECTRICAL");
          //       break; 

          //       case "ELECTRONICS":
          //           setDepartmentdata(arr=> [...arr,'ELECTRONICS']);
          //           childToParent("ELECTRONICS");
          //           break;
          //       case "MECHANICAL":
          //           setDepartmentdata(arr=> [...arr,'MECHANICAL']);
          //           childToParent("MECHANICAL");
          //           break;
          //     }
          //     }
          //     else{
          //       console.log("error fetching user info");
          //     }
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        
      }, []);

   React.useEffect(()=>{
  console.log(departmentdata);
},[departmentdata]);

    return (
        <div>
            <Form.Group  className="mb-3"  controlId="formGridState">
                {/* <Form.Label>Department </Form.Label> */}
                <Form.Select required as="select" onChange={(e) => {childToParent(e.target.value)}}  custom>
                {createSelectItems()}
                </Form.Select>
              </Form.Group>
        </div>
    )
}
