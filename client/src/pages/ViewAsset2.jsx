import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Axios from "axios";
import ComponentToPrint from "../components/ComponentToPrint";
import Qr from "../components/Qr";
import { Redirect } from "react-router-dom";

function AddAsset2(props) {
  const reqpath = window.location.origin + "/info/" + props.match.params.UID;
  const [data, setdata] = React.useState(null);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "WCE Asset" + props.match.params.UID,
  });

  const [logedIN, setlogedIN] = React.useState(true);

  React.useEffect(() => {
    try {
      Axios.post("http://localhost:3002/islogedin", {}).then((response) => {
        if (response && response.status == 266) {
          setlogedIN(true);
          console.log("266");
        } else {
          console.log("login aain");
          setlogedIN(false);
        }
      });
    } catch (error) {
      console.log(error);
      window.alert("Error!");
    }
  }, []);

  React.useEffect(() => {
    Axios.get("http://localhost:3002/addasset/" + props.match.params.UID)
      .then(function (response) {
        console.log(response.data[0]);
        setdata(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!logedIN) {
    return <Redirect to="/admin" />;
  }

  if (data) {
    return (
      <div className="navfootpad">
        <Navbar />
        <div style={{ textAlign: "center" }}>
          <ComponentToPrint ref={componentRef} reqpath={reqpath} data={data} />
          <button
            style={{ marginTop: "20px" }}
            className="simplebtn"
            onClick={handlePrint}
          >
            Print
          </button>
          <hr className="hrline" style={{ padding: 0, marginTop: "20px" }} />

          <Qr name={"WCE Asset" + props.match.params.UID} value={reqpath} />
        </div>

        <Footer />
      </div>
    );
  } else {
    return null;
  }
}

export default AddAsset2;
