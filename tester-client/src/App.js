import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Certificate from "./components/Certificate";
import CreateCertificate from "./components/Certificate/Create";

import middleware from "./middlewares/handler";
import metamask from "./libs/metamask";
import web3 from "./libs/web3";

function App() {
  useEffect(() => {
    if (metamask.isAvailable()) {
      web3.enableWeb3();
    }
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={middleware(Home)} />
      <Route path="/registration" component={Registration} />
      <Route path="/certificates" exact component={middleware(Certificate)} />
      <Route
        path="/certificates/create"
        component={middleware(CreateCertificate)}
      />
    </Switch>
  );
}

export default App;
