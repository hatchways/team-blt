import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper
} from "@material-ui/core";
import FriendCard from "./FriendCard";
import {getFriendDetails} from "../context/actions"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

const myfriends = JSON.parse(localStorage.getItem('friends'));
getFriendDetails(myfriends);
const friendDetails = JSON.parse(localStorage.getItem('friendDetails'));

const Following = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      {friendDetails.map((friendDetail) =>
        <FriendCard key={friendDetail.email} friendemail = {friendDetail.email} friendname = {friendDetail.name} image = {friendDetail.profile_pic} followstate = {1}/>
      )}
    </Paper>
  );
};

export default Following;
