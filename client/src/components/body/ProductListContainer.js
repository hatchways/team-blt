import React, { useState, useEffect, useContext, useCallback } from "react";
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
import DeleteDialogue from "./DeleteDialogue";
import { AddItemProvider } from "../../context/AddItemContext";
import AddItemDialogue from "./AddItemDialogue";

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    margin: "auto",
    padding: "50px 50px 0 50px",
    width: "100%",
    height: "75vh",   
  },
  subtitle: {
      color: "#9b9a9a"
  },
  productList: {
    paddingTop: "1",
    marginTop: "1rem",
    maxHeight: "45vh"
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
    marginTop: "15px",
    marginBottom: "15px"
  },
  deleteButton: {
    marginBottom: "20px",
    backgroundColor: "secondary",
  }
}));

function ProductListContainer({ 
    listTitle, 
    numberOfProducts, 
    openList, 
    handleList,  
    privateList,
    otherUser,
    index
}) 
{
    const classes = useStyles();
    const [listOfProducts, setListOfProducts] = useState([]);
    const currentUser = useAuthState();
    const dispatch = useAuthDispatch();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const {
        openDialogue,
        closeDialogue,
        selectedListIndex,
        setSelectedListIndex,
        inputLink,
        setInputLink,
        addButtonClick,
        onChangeList
    } = useContext(AddItemProvider);

    /* 
    Set setSelectedListIndex to the index number of the list so that when the user tries to add
    an item, the menu will default to the list's title first.
    */
    useEffect(() => {
        setSelectedListIndex(index);
    }, [index, setSelectedListIndex])

    // Handling the delete dialog when the user clicks the delete button
    const handleDeleteDialog = () => {
        if (openDeleteDialog === true) {
            setOpenDeleteDialog(false);
        } else {
            setOpenDeleteDialog(true);
        }
      };

    // Fetching current user's list of products
    const fetchListOfProducts = useCallback(async () => {
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
    }, [currentUser.token, listTitle])

    // Fetching other user's list of products
    const otherUserListOfProducts = useCallback(async () => {
        const response = await fetch(`/users/${otherUser.id}/lists/${listTitle}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
            body: JSON.stringify(),
        })
        const list = await response.json();
        setListOfProducts(list);
    }, [otherUser, listTitle, currentUser.token])
    /*
    The list of of products is fetched from the server on first render of the product list container
    and when the currentUser object is updated and changed.
    */
    useEffect(() => {
        otherUser ? otherUserListOfProducts() : fetchListOfProducts()
    }, [currentUser, otherUser, otherUserListOfProducts, fetchListOfProducts])

    useEffect(() => {
        return () => {}
    }, [])
    
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
                        otherUser={otherUser}
                        deleteProduct={async () => {
                            const response = await fetch(`/lists/${listTitle}/products/${product._id.$oid}`, {
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
                {otherUser ? null 
                    : <Button 
                        variant="contained" 
                        color="primary"
                        className={classes.addButton}
                        onClick={addButtonClick}
                    >
                        Add New Item
                    </Button>
                }
                {otherUser ? null
                    : <Button
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
                }
                {otherUser ? null
                    : <Button
                        variant="contained"
                        size="small"
                        className={classes.deleteButton}
                        onClick={handleDeleteDialog}
                    >
                        Delete
                    </Button>
                }
            </DialogActions>
            { 
                <DeleteDialogue 
                    openDeleteDialog={openDeleteDialog}
                    handleDeleteDialog={handleDeleteDialog}
                    listTitle={listTitle}
                />
            }
            {
                <AddItemDialogue {...{
                    inputLink, 
                    openDialogue, 
                    closeDialogue, 
                    selectedListIndex, 
                    onChangeList, 
                    setInputLink,
                    setSelectedListIndex
                    }}
                />
            }
        </Dialog>
    );
}

export default ProductListContainer;
