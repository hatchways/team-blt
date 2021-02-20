import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton,
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    
  AddIcon:{
      color: "#DF1B1B",
  },
  root: {
    maxWidth: 250,
    flexGrow: "1",
    height:325,
  },
  media: {
    height: 250,
  },
  content: {
    textAlign: "center",
  },
}));

const AddNewList = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardActionArea>
          <CardContent className={classes.content}>
            
            <Typography className={classes.AddIcon} variant="h1">
              +
            </Typography>
            <Typography gutterBottom variant="caption">
              Add New List
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
};

export default AddNewList;