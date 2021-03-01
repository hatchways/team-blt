import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthDispatch, useAuthState } from "../../context/context";
import Product from "./Product";
import { updateProductsLists } from "../../context/actions";

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
    const dispatch = useAuthDispatch();

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
    }, [currentUser])

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
                        deleteProduct={async () => {
                            const response = await fetch(`/lists/${listTitle}/products/${product.product_name}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "aplication/json",
                                    Authorization: `Bearer ${currentUser.token}`,
                                },
                                body: JSON.stringify(),
                            })
                            /* 
                            A new list of product lists is retrieved after the deletion of a product. The new list
                            is then used to overwrite the existing list of product lists.
                            */ 
                            const list = await response.json();
                            updateProductsLists(dispatch, list)
                        }}
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
