import React from "react";
import Navbar from "../components/header/Navbar";
import { Route } from "react-router-dom";
import ShoppingLists from "../features/ShoppingLists";
import Friends from "../features/Friends";
import Notifications from "../features/Notifications";

const UserDashboard = () => {
  return (
    <div>
      <Navbar />
      <ShoppingLists />
      <Route path="/friends" component={Friends} />
      <Route path="/notifications" component={Notifications} />
    </div>
  );
};

export default UserDashboard;
