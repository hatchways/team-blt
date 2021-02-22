import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddItem from "../components/body/AddItem";
import ListsContainer from "../components/body/ListsContainer";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root:{
    },
}));

const ShoppingLists = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <AddItem />
            <ListsContainer/>
        </Box>
    );
};

export default ShoppingLists;