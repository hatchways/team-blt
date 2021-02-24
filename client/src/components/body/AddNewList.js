import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import AddListDialogue from "./AddListDialogue";


const useStyles = makeStyles((theme) => ({
  AddIcon: {
    color: "#DF1B1B",
  },
  root: {
    maxWidth: 250,
    flexGrow: "1",
    height: 325,
  },
  media: {
    height: 250,
  },
  content: {
    textAlign: "center",
  },
}));

const AddNewList = () => {
  const classes = useStyles();
  const [openListDialogue, setOpenListDialogue] = useState(false);
  const openNewListDialogue = () => setOpenListDialogue(true);
  const closeListDialogue = () =>setOpenListDialogue(false);

  const addListClick = () => {
    openNewListDialogue();
  };

  return (
    <>
      <Card onClick={addListClick} className={classes.root}>
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
      {<AddListDialogue {...{ openListDialogue, closeListDialogue }} />}
    </>
  );
};

export default AddNewList;
