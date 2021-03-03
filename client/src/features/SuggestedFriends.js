import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper
} from "@material-ui/core";
import FriendCard from "./FriendCard";
import {getRandomUsers} from "../context/actions"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));



const Suggested = (props) => {
  const myfriends = JSON.parse(localStorage.getItem('friends'));
  getRandomUsers(myfriends);
  const randomUsers = JSON.parse(localStorage.getItem('randomUsers'));
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      {randomUsers.map((randomUser) =>
        <FriendCard key={randomUser.email} friendemail = {randomUser.email} friendname = {randomUser.name} image = {randomUser.profile_pic} followstate = {0}/>
      )}
    </Paper>
  );
};

export default Suggested;
