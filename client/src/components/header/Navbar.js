import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../assets/logo.png";
import avatar from "../../assets/images/0de4ded0e2792aca81775eb8e2f067ae84a4f5f5.png";
import Cookies from 'js-cookie';
import {logout} from '../../actions';
import {useAuthState, useAuthDispatch} from '../../context/context';
import { createBrowserHistory } from 'history';
import MenuTabs from "./MenuTabs";
import {Menu, MenuItem} from "@material-ui/core/"
import { UserModel } from "../../context/UserContext";
import { useAuthState } from "../../context/context";

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
    marginLeft: "auto",
  },
  avatar: {
    marginRight: theme.spacing(1),    
  },
  button: {    
    textTransform: "none",
    color:"inherit",
    marginTop: theme.spacing(6),
  },
}));

const history = createBrowserHistory();

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useAuthDispatch();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    const response = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get(JSON.parse(localStorage.getItem('email')))
      },
    });

    if (response.status==422){
      console.log('already logout, please log in');
      history.push('/login');
    }

    if (response.ok) {
      console.log('logout successfully');
      logout(dispatch);
      history.push('/login');
    }
  }

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
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      <MenuItem onClick={handleMenuClose}>Go to Profile</MenuItem>
      <MenuItem onClick={handleSetting}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
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
          
          <Button            
            className={classes.button}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <Avatar 
              alt="Profile Pic" 
              src={
                  currentUser.profile_pic ? currentUser.profile_pic 
                  : 'https://dealsmateprofilepic.s3.us-east-2.amazonaws.com/mr-anonymous.png'
                } 
              className={classes.avatar}
            />
            Profile
          </Button>
        </Toolbar>
        {openSettingDialogue ? <UserSetting {...{ handleSetting, openSettingDialogue }}/> : null}
      </AppBar>
      {renderMenu}
    </div>
  );
}
