import React from "react";
import { Redirect, HashRouter, Switch, Route } from "react-router-dom";
import Info from "./pages/Info";
import Infoall from "./pages/Infoall";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
// import Qr from "./components/Qr";
import LanDingPageFaculty from "./pages/LanDingPageFaculty";
import ManageAdmins from "./pages/ManageAdmins";
import UpdateAsset1 from "./pages/UpdateAsset1";
import UpdateAsset2 from "./pages/UpdateAsset2";

import ViewAsset1 from "./pages/ViewAsset1";
import ViewAsset2 from "./pages/ViewAsset2";

import AddAsset1 from "./pages/AddAsset1";
import AddAsset2 from "./pages/AddAsset2";
import AddAsset3 from "./pages/AddAsset3";
import AddAsset4 from "./pages/AddAsset4";
import ImportExportCSV from "./pages/ImportExportCSV";
import QrcodeDownload from "./pages/QrcodeDownload";
import About from "./pages/About";
import Public from "./pages/Public";
import Dropdown from "./pages/Dynamicdropdown";
import AdminProfile from "./pages/AdminProfile";
import PassReset from "./pages/PassReset";
import Axios from "axios";
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Public} />
        <Route path="/admin">
          <LandingPage />
        </Route>
        <Route path="/passReset" component={PassReset} />
        <Route path="/info/:uid">
          {" "}
          <Info />{" "}
        </Route>
        <Route path="/infoall/:uid">
          {" "}
          <Infoall />{" "}
        </Route>
        <Route path="/login" component={LanDingPageFaculty} />
        <Route path="/dropdown">
          <Dropdown />{" "}
        </Route>
        <Route path="/adminprofile">
          {" "}
          <AdminProfile />{" "}
        </Route>

        <Route path="/manageadmins">
          <ManageAdmins />
        </Route>
        <Route path="/addAsset1">
          <AddAsset1 />
        </Route>
        <Route path="/addAsset2/:UID" component={AddAsset2} />
        <Route path="/updateAsset/:UID" component={UpdateAsset1} />
        <Route path="/about" component={About} />

        <Route path="/import-export">
          <ImportExportCSV />
        </Route>

        <Route path="/viewAsset1">
          <ViewAsset1 />
        </Route>
        <Route path="/qrcodeDownload">
          <QrcodeDownload />
        </Route>
        {/* <Route path="/updateAsset1">{ uidval && <UpdateAsset1/>}</Route> */}
        <Route path="/updateAsset2">
          <UpdateAsset2 />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
}

export default App;
