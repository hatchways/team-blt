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
import { makeStyles } from "@material-ui/core/styles";
import { useAuthState } from "../../context/context";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    margin: "auto",
    padding: "50px",
    width: "100%",
    height: "80vh",   
  },
  subtitle: {
      color: "#9b9a9a"
  },
  button: {
      justifyContent: "center",
      width: "200px",
      margin: "auto",
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
            <Typography variant="h4">{listTitle}</Typography>
            <Typography 
                variant="subtitle1" 
                className={classes.subtitle}
            >
                {numberOfProducts} items
            </Typography>
            <DialogContent>
                {listOfProducts.map((product) => (
                    <Product 
                        key={product._id.$oid} 
                        productName={product.product_name}
                        url={product.url}
                        price={product.price}
                        image={product.product_image}
                        listTitle={listTitle}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.button}
                >
                Add New Item
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductListContainer;
