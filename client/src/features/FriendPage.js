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

const FriendPage = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <FriendCard/>
      <FriendCard/>
      <FriendCard/>
    </Paper>
  );
};

export default FriendPage;
