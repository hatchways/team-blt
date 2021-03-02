import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Paper
} from "@material-ui/core";
import Following from "./FollowingFriends";
import Suggested from "./SuggestedFriends";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3rem",
  },
}));

const Friends = (props) => {
  const classes = useStyles();
  const [selectTab, setSelectTab] = React.useState(0);

  const handleChange = (e, newValue) => {
    setSelectTab(newValue);
  }

  return (
    <Paper className={classes.container}>
      <h2>Friends</h2>
      <Tabs
        value={selectTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="FOLLOWING"/>
        <Tab label="SUGGESTED"/>
      </Tabs>
      {selectTab === 0 && <Following/>}
      {selectTab === 1 && <Suggested/>}
    </Paper>
  );
};

export default Friends;
