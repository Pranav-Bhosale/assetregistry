import React from "react";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import TableFaculty from "../components/TableFaculty";
import Axios from "axios";

function InfoAll() {
  const { uid } = useParams();
  const [data, setdata] = React.useState(null);
  const [Resmsg, setResmsg] = React.useState(null);

  React.useEffect(() => {
    Axios.get("http://localhost:3002/addasset/" + uid)
      .then(function (response) {
        if (response.data.err) {
          const msg = "Error code:" + response.data.err.code;
          setResmsg(msg);
        } else {
          if (response.data[0]) {
            setdata(response.data);
            setResmsg(null);
          } else setResmsg("No Data Found!");
        }
      })
      .catch(function (error) {
        setResmsg(error);
      });
  }, []);

  return (
    <div className="navfootpad" style={{ textAlign: "center" }}>
      <TitleBar />
      
      {data && (
        <TableFaculty
          uid={data[0].UID}
          department={data[0].Department}
          assetNo={data[0].AssetNumber}
          equipType={data[0].EqpType}
          nameEquip={data[0].NameOfEqp}
          specsConfig={data[0].SpecsConfig}
          make={data[0].Make}
          allocationFund={data[0].AllocationFund}
          dop={data[0].DOP}
          costPerUnit={data[0].CostPerUnit}
          quantity={data[0].Quantity}
          totaolCost={data[0].TotalCost}
          warranty={data[0].Warranty}
          location={data[0].LocEqp}
          supplier={data[0].SupplierName}
          supplierEmail={data[0].SupplierAddress}
          supplierMobNo={data[0].SupplierMobNo}
          utilization={data[0].Utilization}
          status={data[0].Status}
          remark={data[0].Remark}
          part={data[0].Part}
          link={data[0].PhotoLink}
        />
      )}
      
      <hr className="hrline" />
      <p style={{ textAlign: "center" }}>{Resmsg}</p>
     
      <Footer/>
    </div>
  );
}

export default InfoAll;
