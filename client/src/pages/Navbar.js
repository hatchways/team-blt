import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { Tab, Tabs } from "@material-ui/core";
import logo from "../assets/logo.png";
import avatar from "../assets/images/0de4ded0e2792aca81775eb8e2f067ae84a4f5f5.png";
import MenuTabs from "../components/MenuTabs";
import {Menu, MenuItem} from "@material-ui/core/"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Open Sans",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "#FFF",
    color: "#000",
    height: "5rem",
  },
  logo: {
    height: "2rem",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginRight: "auto",
  },
  tabContainer: {
    //padding: theme.spacing(3),
    marginLeft: "auto",
  },
  avatar: {
    marginLeft: theme.spacing(6),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      <MenuItem onClick={handleMenuClose}>Go to Profile</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <div className={classes.title}>
            <img src={logo} className={classes.logo} alt="Deals Mate"></img>
          </div>
          <div className={classes.tabContainer}>
            <MenuTabs />
          </div>
          <Avatar alt="Remy Sharp" src={avatar} className={classes.avatar} />
          <Button
            color="inherit"
            className={classes.button}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            Profile
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
