import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
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
    display: "flex",
    margin: "auto",
    width: "250px",
    height: "350px",
    marginRight: "1rem",
    marginTop:"1rem",
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
    <Box>
      <Card onClick={addListClick} className={classes.root}>
        <CardActionArea>
          <CardContent className={classes.content}>
            <Typography className={classes.AddIcon} variant="h1">
              +
            </Typography>
            <Typography gutterBottom variant="h6" >
              Add New List
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {<AddListDialogue {...{ openListDialogue, closeListDialogue }} />}
    </Box>
  );
};

export default AddNewList;
