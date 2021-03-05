import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/header/Navbar";

const useStyles = makeStyles((theme) => ({
    
}));

const Notifications = (props) => {
    const classes = useStyles();

    return (
        <>
            <Navbar />
            <h5>Notifications Default</h5>
        </>
    );
};

export default Notifications;