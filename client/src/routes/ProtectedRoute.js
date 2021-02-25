import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/context";

const ProtectedRoute = ({ component: Component, path }) => {
  const currentUser = useAuthState();
  return (
    <Route
      path={path}
      render={(props) => {
        if (!Boolean(currentUser.token)) {
          return <Redirect to={{ pathname: "/login" }} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
