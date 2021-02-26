import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
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
  Typography
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function FriendCard() {
  const classes = useStyles();
  const [follow, setFollow] = React.useState(false);

  const handleExpandClick = () => {
    setFollow(!follow);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile image" className={classes.avatar}>
            img
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <FavoriteIcon />
          </IconButton>
        }
        title="User Name"
      />
    </Card>
  );
}
