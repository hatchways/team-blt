import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListCards from "../../components/body/ListCards";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "5rem",
  },
  listLabel: {
    margin: "2rem 0",
  },
}));

const ListsContainer = ({ otherUser }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      <Grid item xs={3} className={classes.listLabel}>
        <Typography variant="h6">
          {otherUser ? "Shopping Lists:" : "My Shopping Lists:"}
        </Typography>
      </Grid>
      <ListCards otherUser={otherUser} />
    </Grid>
  );
};

export default ListsContainer;
