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
  const parsedListOfFriendsEmail = currentUser.friends.map(friend => JSON.parse(friend).email);
  /*
  Since the current user's list of friends is an array of stringified JSON, 
  we must parse the JSON strings before seeing if the user from the list of
  users is in the current user's friends list. To do this, we will compare 
  the emails from the parsedListOfFriendsEmail to the users list emails.
  */
  
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const users = await response.json();
      setRandomUsers(users)
    }
    fetchUsers();
  }, [currentUser]);

  return (
    <Paper className={classes.container}>
      {randomUsers
        .filter(randomUser => currentUser.email != randomUser.email) // Filter out current user
        .filter(randomUser => !(parsedListOfFriendsEmail.includes(randomUser.email))) // Filter out any user in the current user's list of friends
        .map(randomUser =>
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
