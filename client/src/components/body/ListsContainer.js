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
  listLabel:{
    margin:"2rem 0",
  },
}));

const ListsContainer = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <Grid item xs={3} className={classes.listLabel}>
      <Typography variant="h6">
        My Shopping Lists:
      </Typography>
      </Grid>
      <ListCards/>
    </Grid>
  );
};

export default ListsContainer;
