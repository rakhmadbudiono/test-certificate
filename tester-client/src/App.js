import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/Main";

import requireMetamask from "./middlewares/handler";

function App() {
  return (
    <Switch>
      <Route path="/" component={requireMetamask(Main)} />
    </Switch>
  );
}

export default App;
