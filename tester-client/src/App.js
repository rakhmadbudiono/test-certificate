import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
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
      <Route path="/certificates" exact component={Certificate} />
      <Route path="/certificates/create" component={CreateCertificate} />
    </Switch>
  );
}

export default App;
