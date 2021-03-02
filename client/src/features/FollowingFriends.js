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

const friends = JSON.parse(localStorage.getItem('friends'));

const Following = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      {friends.map((friend) =>
        <FriendCard key={friend} friendname = {friend} image = {"img"} followstate = {1}/>
      )}
    </Paper>
  );
};

export default Following;
