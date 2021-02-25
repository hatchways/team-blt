import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/context";

const LoginRoute = ({ component: Login, path }) => {
  const currentUser = useAuthState();
  return (
    <Route
      path={path}
      render={(props) => {
        if (Boolean(currentUser.token)) {
          return <Redirect to={{ pathname: "/" }} />;
        } else {
          return <Login {...props} />;
        }
      }}
    />
  );
};

export default LoginRoute;
