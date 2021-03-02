import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper
} from "@material-ui/core";
import FriendCard from "./FriendCard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Suggested = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <FriendCard friendname = {"s1@user.com"} image = {"img"}/>
      <FriendCard friendname = {"s2@user.com"} image = {"img"}/>
      <FriendCard friendname = {"s3@user.com"} image = {"img"}/>
    </Paper>
  );
};

export default Suggested;
