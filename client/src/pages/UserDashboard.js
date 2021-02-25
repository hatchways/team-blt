import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/header/Navbar";
import { Switch, Route } from "react-router-dom";

import ShoppingLists from "../features/ShoppingLists";
import Friends from "../features/Friends";
import Notifications from "../features/Notifications";

const useStyles = makeStyles((theme) => ({}));

const UserDashboard = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <Route path="/shopping" exact component={ShoppingLists} />
      <Route path="/friends" component={Friends} />
      <Route path="/notifications" component={Notifications} />
    </div>
  );
};

export default UserDashboard;
