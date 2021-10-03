import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Home } from "./pages/Home";
import { HOME } from "./Paths";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={HOME} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
