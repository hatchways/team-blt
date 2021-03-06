import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper
} from "@material-ui/core";
import FriendCard from "./FriendCard";
import { useAuthState } from "../context/context"

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));
const Following = () => {
  const classes = useStyles();
  const currentUser = useAuthState();
  const [friendDetails, setFriendDetails] = useState([]);
  
  useEffect(() => {
    async function getFriends() {
      const response = await fetch(`/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(),
      });
      const user = await response.json();

      setFriendDetails(user.friends)
    }
    getFriends();
  }, [currentUser]);
  
  return (
    <Paper className={classes.container}>
      {friendDetails
        .map(friendDetail => JSON.parse(friendDetail))
        .map(friendDetail =>
        <FriendCard 
            key={friendDetail._id.$oid} 
            friendId={friendDetail._id.$oid}
            friendemail={friendDetail.email}
            friendname={friendDetail.name} 
            image={friendDetail.profile_pic} 
            followstate={1}
        />
      )}
    </Paper>
  );
};
export default Following;