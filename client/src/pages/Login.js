import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Landing from "./Landing";
import {Route} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  listsDisplay: {
    margin: theme.spacing(0, 0, 12, 0),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  return (
    <Button variant="contained" color="primary" href="/landing">
      Login      
    </Button>
  );
};

export default Login;
