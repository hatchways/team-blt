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
  console.log(currentUser);
  const [friendDetails, setFriendDetails] = useState([]);
  useEffect(
    () => {
      const details = getFriendDetails(currentUser.friends)
      console.log(details);

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
      setFriendDetails(result);


    };
  const classes = useStyles();
  console.log(friendDetails);




  return (
    <Paper className={classes.container}>
      {friendDetails.map((friendDetail) =>
        <FriendCard key={friendDetail.email} friendemail = {friendDetail.email} friendname = {friendDetail.name} image = {friendDetail.profile_pic} followstate = {1}/>
      )}
    </Paper>
  );
};

export default Following;
