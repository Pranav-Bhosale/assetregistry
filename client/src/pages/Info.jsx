import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import TablePublic from "../components/TablePublic";
import TitleBar from "../components/TitleBar";
import Axios from "axios";


function Info() {
const {uid}=useParams();
const [data,setdata]=React.useState(null);
const [Resmsg ,setResmsg]= React.useState(null);

React.useEffect(()=>{
  Axios.get('http://localhost:3002s/addasset/'+uid)
  .then(function (response) {
    if(response.data.err)
    {
      const msg ="Error code:"+response.data.err.code;
      setResmsg(msg);
    }
    else
    { 
      if(response.data[0])
      {
        setdata(response.data);
        setResmsg(null);
      }
      else
      setResmsg("No Data Found!");
    }
   
  })
  .catch(function (error) {
    setResmsg(error);
  });
 },[]);

  return (
    <div className="navfootpad" style={{textAlign:"center"}}>
    <TitleBar />
    { data && <TablePublic
    uid={data[0].UID}
    assetNo={data[0].AssetNumber}
    equipType={data[0].EqpType} 
    nameEquip={data[0].NameOfEqp} 
    specsConfig={data[0].SpecsConfig} 
    make={data[0].Make}
    dop={data[0].DOP} 
    warranty={data[0].Warranty} 
    supplier={data[0].SupplierName} />
    }
    <hr className="hrline" />
    <p style={{ textAlign:"center"}}>{Resmsg}</p>
    <div style={{textAlign:"center",marginBottom:"25px"}}>
    <Link to={{
      pathname:"/login",
      state:uid
    }}>Sign In for More Details</Link>
    </div>

    <Footer/>
    </div>
   
  );
}

export default Info;
