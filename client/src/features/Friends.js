import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Paper
} from "@material-ui/core";
import Following from "./FollowingFriends";
import Suggested from "./SuggestedFriends";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabs:{
    width: 550,
  },
}));

const Friends = (props) => {
  const classes = useStyles();
  const [selectTab, setSelectTab] = React.useState(0);
  const handleChange = (newValue) => {
    setSelectTab(newValue);
  }
  return (
    <Paper className={classes.container}>
      <h2>Friends</h2>
      <Tabs
        className={classes.tabs}
        value={selectTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab label="FOLLOWING" />
        <Tab label="SUGGESTED" />
      </Tabs>
      {selectTab === 0 && <Following />}
      {selectTab === 1 && <Suggested />}
    </Paper>
  );
};
export default Friends;