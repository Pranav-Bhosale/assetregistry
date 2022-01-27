import React from "react";
import Navbar from "./components/Navbar";
import  { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from "./components/Footer";
import ViewAsset from "./pages/ViewAsset1";

function Dash() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
    <Switch>
      <Route path="/addAsset1"> <h1> addAsset1</h1></Route>
      <Route path="/addAsset2"> <h1> addAsset3</h1> </Route>
      <Route path="/addAsset3"> <h1> addAsset3</h1></Route>
      <Route path="/addAsset4"><h1> addAsset4</h1> </Route>

      <Route path="/profile"><h1> profile</h1> </Route>

      <Route path="/viewAsset1"> <ViewAsset/></Route>

      <Route component={NotFound} />
    </Switch>
   </BrowserRouter>
   <Footer/> 
</>
  );
}

export default Dash;