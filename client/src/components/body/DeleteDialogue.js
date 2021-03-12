import React from 'react';
import {
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
  } from "@material-ui/core";
import { updateProductsLists } from "../../context/actions";
import { useAuthDispatch, useAuthState } from "../../context/context";

function DeleteDialogue({ openDeleteDialog, handleDeleteDialog, listTitle }) {
    const currentUser = useAuthState();
    const dispatch = useAuthDispatch();

    // Delete list function
    async function deleteList() {
        const response = await fetch(`/lists/${listTitle}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
            body: JSON.stringify(),
        })
        /* 
        A new list of product lists is retrieved after the deletion of a list. The new list
        is then used to overwrite the existing list of product lists.
        */ 
        const list = await response.json();
        updateProductsLists(dispatch, list)  
    }

    return (
        <Dialog
            open={openDeleteDialog}
        >
            <DialogContent style={{margin: "15px", padding: "20px"}}>
                <Typography variant="h6">Are you sure you want to delete your list?</Typography>
            </DialogContent>
            <DialogActions style={{margin: "auto", height: "5vh"}}>
                <Button
                    onClick={deleteList}
                    variant="contained"
                    size="large"
                    color="primary"
                >
                    Yes
                </Button>
                <Button
                    onClick={handleDeleteDialog}
                    variant="outlined"
                    size="large"
                    style={{padding: "8px 22px 8px 22px"}}
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialogue
