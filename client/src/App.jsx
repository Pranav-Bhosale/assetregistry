import React from "react";
import { HashRouter , Switch,Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Info from "./pages/Info";
import Infoall from "./pages/Infoall"
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
// import Qr from "./components/Qr";
import LanDingPageFaculty from "./pages/LanDingPageFaculty"
import Profile from "./pages/Profile";
import AddFaculty from "./pages/AddFaculty"
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




function App() {

  const [uidval,setuidval]=React.useState(null);
const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
       setuidval(user.uid);
    } else {
      setuidval(null);
    }
  });
  return (
    <HashRouter>
     <Switch>
       <Route path="/"  exact><LandingPage/> </Route>
       <Route path="/info/:uid"> <Info/> </Route>
       <Route path="/infoall/:uid"> { uidval && <Infoall/> }</Route>
       <Route path="/login" component={LanDingPageFaculty}/>

       <Route path="/addfaculty"> { uidval && <AddFaculty/> }</Route>
       <Route path="/addAsset1">{ uidval && <AddAsset1/> }</Route>
       <Route path="/addAsset2/:UID" component={AddAsset2} />
       <Route path="/updateAsset/:UID" component={UpdateAsset1} />
       <Route path="/addAsset3">{ uidval && <AddAsset3/> }</Route>
       <Route path="/addAsset4"> { uidval &&<AddAsset4/> }</Route>

       {/* <Route path="/profile">{ uidval && <Profile /> } </Route> */}
       <Route path="/about" component={About}/>

       <Route path="/import-export">{ uidval && <ImportExportCSV /> } </Route>

       <Route path="/viewAsset1">{ uidval &&  <ViewAsset1/> }</Route>
       <Route path="/qrcodeDownload">{ uidval && <QrcodeDownload/>}</Route>
       {/* <Route path="/updateAsset1">{ uidval && <UpdateAsset1/>}</Route> */}
       <Route path="/updateAsset2">{ uidval && <UpdateAsset2/>}</Route>

       <Route component={NotFound} />
     </Switch>
    </HashRouter> 
  );
}

export default App;