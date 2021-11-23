import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Kanban from "./components/Kanban/Kanban";
import Login from "./components/Login";
import { PrivateRoute } from "./components/privateRoute";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

export default () => (
  <Switch>
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/" exact component={Welcome} />
    <PrivateRoute exact path="/kanban" component={Kanban} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    {/* <Route path="/kanban" exact component={Kanban} /> */}
  </Switch>
);
