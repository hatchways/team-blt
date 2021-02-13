import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    listsDisplay: {
        margin: theme.spacing(0, 0, 12, 0)
    }
}));

const Notifications = (props) => {
    const classes = useStyles();

    return (
        <div>
            Notifications Deafult
        </div>
    );
};

export default Notifications;