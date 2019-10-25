import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Home";
import Event from "../Event";
import Events from "../Events";
import CheckIn from "../CheckIn";
import Account from "../Account";
import CreateEvent from "../CreateEvent";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/event/:id" component={Event} />
    <Route exact path="/events" component={Events} />
    <Route path="/events/:offset" component={Events} />
    <Route path="/checkin/:id" component={CheckIn} />
    <Route path="/account" component={Account} />
    <Route path="/create-event" component={CreateEvent} />
  </Switch>
);

export default Routes;
