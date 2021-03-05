import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import { followFriends, getFriends, unfollowFriends } from '../context/actions';
import { useAuthDispatch } from '../context/context';
import { Redirect} from "react-router-dom";
import { createBrowserHistory } from 'history';
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
    height: 120,

  },
  header: {
    alignItems: "center",



  },
  title: {
    fontSize: 18,
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "6rem",
    height: "3rem",
    margin:"1rem",
  },
}));

export default function FriendCard({friendemail, friendname, image, followstate}) {
  const classes = useStyles();
  const [follow, setFollow] = React.useState(followstate);
  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useAuthDispatch();
  const history = createBrowserHistory();


  const handleProfileClick = () => {
    history.push('/shopping')
  };

  const handleFollowClick = () => {
    setFollow(1);
    followFriends(dispatch, token, friendemail);
  };

  const handleUnfollowClick = () => {
    setFollow(0);
    unfollowFriends(dispatch, token, friendemail);
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
          <Avatar
            aria-label="profile image"
            src = {image}
            onClick = {handleProfileClick}
            className={classes.avatar}
          >
          </Avatar>
        }
        action={
          follow ?
            <UnfollowButton onClick = {handleUnfollowClick}/> :
            <FollowButton onClick = {handleFollowClick}/>
        }
        title={
          <Typography variant="h6" component="h2" className={classes.title}>
            {friendname}
          </Typography>
        }
      />
    </Card>
  );
}
