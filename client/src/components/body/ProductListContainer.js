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
import "../../themes/scrollbar.css";

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    margin: "auto",
    padding: "50px 50px 0 50px",
    width: "100%",
    height: "70vh",   
  },
  subtitle: {
      color: "#9b9a9a"
  },
  productList: {
    paddingTop: "1",
    marginTop: "1rem"
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
      width: "200px",
      margin: "auto",
      marginTop: "50px",
  },
  toggleButton: {
    marginTop: "20px"
  }
}));

function ProductListContainer({ 
    listTitle, 
    numberOfProducts, 
    openList, 
    handleList,  
    privateList
}) 
{
    const classes = useStyles();
    const [listOfProducts, setListOfProducts] = useState([]);
    const currentUser = useAuthState();
    const dispatch = useAuthDispatch();

    /*
    The list of of products is fetched from the server on first render of the product list container
    and when the currentUser object is updated and changed.
    */
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
    
    // This function toggles the list's privacy setting.
    async function togglePrivate() {
        const response = await fetch(`/lists/${listTitle}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({ private: privateList ? false : true })
        })
        const list = await response.json();
        updateProductsLists(dispatch, list)
    }

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
            <DialogContent className="product" classes={{root: classes.productList}}>
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
            <DialogActions className={classes.actionContainer}>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.addButton}
                >
                Add New Item
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.toggleButton}
                    style={privateList ? {
                        backgroundColor: "#9b9a9a"
                    } : {
                        backgroundColor: "#FFFFFF"
                    }}
                    onClick={togglePrivate}
                >
                    {privateList ? "Private" : "Public"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductListContainer;
