import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';


function TableFaculty(props) {
  return (
    <Table  className="tableclass" striped bordered hover size="sm" responsive>
   
    <tbody>
       <tr>
        <td>UID</td>
        <td>{props.uid}</td>
      </tr>
      <tr>
        <td>Asset No</td>
        <td>{props.assetNo}</td>
      </tr>
      <tr>
        <td>Equipment Type</td>
        <td>{props.equipType}</td>
      </tr>
      <tr>
        <td>Name Of Equipment</td>
        <td>{props.nameEquip}</td>
      </tr>
      <tr>
        <td>Specification/Configuration</td>
        <td>{props.specsConfig}</td>
      </tr>
      <tr>
        <td>Make</td>
        <td>{props.make}</td>
      </tr>
      <tr>
        <td>Allocation Fund</td>
        <td>{props.allocationFund}</td>
      </tr>
      <tr>
        <td>Date Of Purchase</td>
        <td>{props.dop}</td>
      </tr>
      <tr>
        <td>Cost per Unit</td>
        <td>{props.costPerUnit}</td>
      </tr>
      <tr>
        <td>Quantity</td>
        <td>{props.quantity}</td>
      </tr>
      <tr>
        <td>Total Cost(Rs.)</td>
        <td>{props.totaolCost}</td>
      </tr>
      <tr>
        <td>Warranty</td>
        <td>{props.warranty}</td>
      </tr>
      <tr>
        <td>Loaction of Equipment</td>
        <td>{props.location}</td>
      </tr>
      <tr>
        <td>Supplier</td>
        <td>{props.supplier}</td>
      </tr>
      <tr>
        <td>Supplier Email</td>
        <td>{props.supplierEmail}</td>
      </tr>
      <tr>
        <td>Supplier Mobile No.</td>
        <td>{props.supplierMobNo}</td>
      </tr>
      <tr>
       <td>Utilzation in Hrs/Day</td>
        <td>{props.utilization}</td>
      </tr>
      <tr>
       <td>Status</td>
        <td>{props.status}</td>
      </tr>
      <tr>
       <td>Remark</td>
        <td>{props.remark}</td>
      </tr>
      <tr>
       <td>Part</td>
        <td>{props.part}</td>
      </tr>
    </tbody>
  </Table>
  );
}
export default TableFaculty;