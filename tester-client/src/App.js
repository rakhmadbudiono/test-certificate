import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/Main";

import Middleware from "./middlewares/handler";
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
      <Route path="/" component={Middleware(Main)} />
    </Switch>
  );
}

export default App;
