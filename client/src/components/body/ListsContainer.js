import React, { useState, useContext, useEffect } from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListCards from "../../components/body/ListCards";
import AddNewList from "../../components/body/AddNewList";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "5rem",
  },
}));

const ListsContainer = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <Typography variant="h6">
        My Shopping Lists:
      </Typography>
      <ListCards/>
    </Grid>
  );
};

export default ListsContainer;
