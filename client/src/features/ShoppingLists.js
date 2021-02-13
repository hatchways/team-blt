import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    listsDisplay: {
        margin: theme.spacing(0, 0, 12, 0)
    }
}));

const ShoppingLists = (props) => {
    const classes = useStyles();

    return (
        <div>
            Shopping List Deafult
        </div>
    );
};

export default ShoppingLists;