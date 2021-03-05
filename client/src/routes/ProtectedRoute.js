import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/context";

const ProtectedRoute = ({ children }) => {
  const currentUser = useAuthState();
  
  return (
    currentUser.token ? children : <Redirect to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
