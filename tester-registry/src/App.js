import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Registration from "./components/Registration";
import Approval from "./components/Approval";
import Verify from "./components/Verify";
import Authority from "./components/Authority";

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
      <Route path="/verify" component={Verify} />
      <Route path="/approval" component={Approval} />
      <Route path="/authority" component={Authority} />
    </Switch>
  );
}

export default App;
