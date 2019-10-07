import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Home";
import Event from "../Event";
import CheckIn from "../CheckIn";
import CheckInEvent from "../CheckIn/CheckInEvent";
import Account from "../Account";
import CreateEvent from "../CreateEvent";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/event/:id" component={Event} />
    <Route exact path="/checkin" component={CheckIn} />
    <Route path="/checkin/:id" component={CheckInEvent} />
    <Route path="/account" component={Account} />
    <Route path="/create-event" component={CreateEvent} />
  </Switch>
);

export default Routes;
