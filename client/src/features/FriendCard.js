import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import { followFriends, getFriends, unfollowFriends } from '../context/actions';
import { useAuthDispatch } from '../context/context';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Button,
  Typography
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    height: 150,
  },
  header: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "6rem",
    height: "3rem",
    marginTop:"2.5rem",
  },
}));

export default function FriendCard({friendname, image, followstate}) {
  const classes = useStyles();
  const [follow, setFollow] = React.useState(followstate);
  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useAuthDispatch();

  const handleFollowClick = () => {
    setFollow(1);
    followFriends(dispatch, token, friendname);
  };

  const handleUnfollowClick = () => {
    setFollow(0);
    unfollowFriends(dispatch, token, friendname);
  };

  function FollowButton(props) {
    return (
      <Button
        onClick={props.onClick}
        className={classes.button}
        variant="contained"
      >
        Follow
      </Button>
    );
  }

  function UnfollowButton(props) {
    return (
      <Button
        onClick={props.onClick}
        className={classes.button}
        variant="contained"
      >
        Unfollow
      </Button>
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="profile image" className={classes.avatar}>
            image
          </Avatar>
        }
        action={
          follow ?
          <UnfollowButton onClick = {handleUnfollowClick}/> :
          <FollowButton onClick = {handleFollowClick}/>
        }
        title={friendname}
      />
    </Card>
  );
}
