import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthState } from "../../context/context";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: "auto",
    width: "500px",   
  },
  subtitle: {
      color: "#9b9a9a"
  },
  button: {
      justifyContent: "center",
      margin: "auto"
  }
}));

function ProductListContainer({ 
    listTitle, 
    numberOfProducts, 
    openList, 
    handleList,  
}) 
{
    const classes = useStyles();
    const [listOfProducts, setListOfProducts] = useState([]);
    const currentUser = useAuthState();
    
    console.log(listTitle)
    useEffect(() => {
        async function fetchListOfProducts() {
            const response = await fetch(`/lists/${listTitle}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "aplication/json",
                    Authorization: `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify(),
            })
            const list = await response.json();
            setListOfProducts(list);
        }
        fetchListOfProducts();
    }, [listTitle])

    console.log(listOfProducts)

    return (
        <Dialog
        open={openList}
        onClose={handleList}
        classes={{ paper: classes.dialog }}
        >
            <DialogTitle disableTypography>
                <Typography variant="h5">{listTitle}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography 
                    variant="subtitle1" 
                    className={classes.subtitle}
                >
                    {numberOfProducts} items
                </Typography>
                {listOfProducts.map((product) => (
                    <Product key={product._id.$oid} productName={product.product_name}/>
                ))}
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary"
                    className={classes.button}
                >
                Add Item
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductListContainer;
