import React from "react";
import { Route } from "react-router-dom";
import ShoppingLists from "../features/ShoppingLists";
import Friends from "../features/Friends";
import Notifications from "../features/Notifications";

const UserDashboard = () => {
  return (
    <div>
      <ShoppingLists />
      <Route path="/friends" component={Friends} />
      <Route path="/notifications" component={Notifications} />
    </div>
  );
};

export default UserDashboard;
