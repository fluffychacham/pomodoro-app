import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import { MAIN } from "./Paths";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={MAIN} component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
