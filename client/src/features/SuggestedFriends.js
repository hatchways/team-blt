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

const Suggested = () => {
  const classes = useStyles();
  const currentUser = useAuthState();
  const [randomUsers, setRandomUsers] = useState([]);
  
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const users = await response.json();
      console.log(users)
      setRandomUsers(users)
    }
    fetchUsers();
  }, [currentUser]);
  

  return (
    <Paper className={classes.container}>
      {randomUsers.filter(randomUser => currentUser.email != randomUser.email).map((randomUser) =>
        <FriendCard 
            key={randomUser._id.$oid}
            friendId={randomUser._id.$oid} 
            friendemail={randomUser.email} 
            friendname={randomUser.name} 
            image={randomUser.profile_pic}
            followstate={0}
        />
      )}
    </Paper>
  );
};

export default Suggested;
