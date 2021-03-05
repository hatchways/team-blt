import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper
} from "@material-ui/core";
import FriendCard from "./FriendCard";
import {useAuthState} from "../context/context"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));



const Suggested = (props) => {
  const currentUser = useAuthState();
  const [randomUsers, setRandomUsers] = useState([]);
  useEffect(
    () => {
      getRandomUsers(currentUser.friends)

    },[currentUser]);
    const getRandomUsers = async (myfriends) => {
      const input = {
        getFriends : false,
        friends : myfriends
      }

      const response = await fetch(`/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();
      setRandomUsers(result);

    };
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      {randomUsers.filter(randomUser => currentUser.email != randomUser.email).map((randomUser) =>
        <FriendCard key={randomUser.email} friendemail = {randomUser.email} friendname = {randomUser.name} image = {randomUser.profile_pic} followstate = {0}/>
      )}
    </Paper>
  );
};

export default Suggested;
