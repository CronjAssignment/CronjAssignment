import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout/layout";
import Login from "../components/login/login";

const Routes: React.SFC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/layout" component={Layout} />
    </Switch>
  </Router>
);

export default Routes;
