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
const Following = (props) => {
  const currentUser = useAuthState();
  const [friendDetails, setFriendDetails] = useState([]);
  useEffect(
    () => {
      getFriendDetails(currentUser.friends)
    },[currentUser]);
    const getFriendDetails = async (myfriends) => {
      const input = {
        getFriends : true,
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
      console.log(result)
      setFriendDetails(result);
    };
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      {friendDetails.map((friendDetail) =>
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