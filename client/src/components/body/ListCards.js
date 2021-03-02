import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid
} from "@material-ui/core";
import AddNewList from "../../components/body/AddNewList";
import { useAuthState } from "../../context/context";
import ProductListCard from "./ProductListCard";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "auto",
    maxWidth: "70vw"
  }
}));

const ListCards = () => {
  const classes = useStyles();
  const currentUser = useAuthState();

  return ( 
    <Grid className={classes.cardContainer}>    
      {currentUser.list_of_products.map((list) => (
        <ProductListCard
          key={list._id.$oid}
          listTitle={list.list_title}
          cover_image_url={list.cover_image_url}
          numberOfProducts={list.products.length}
        />
      ))}
      <AddNewList />
    </Grid>
  );
};

export default ListCards;
