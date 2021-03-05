import React, {useState} from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { addProducts } from "../../context/actions";
import { useAuthState, useAuthDispatch } from "../../context/context";

const useStyles = makeStyles((theme) => ({
  dialog: {
    justifyContent: "center",
    textAlign: "center",
  },
  boxInput: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    paddingTop: theme.spacing(6),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  boxSelect: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    paddingTop: theme.spacing(6),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    width: "30rem",
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
  },
  pasteLink: {
    width: "30rem",
    height: "3rem",
    textAlign:"center",
    boxShadow: "0px 0px 10px #eee",
  },
  formControl: {},
  listDropdown: {
    width: "30rem",
    height: "3rem",
    boxShadow: "0px 0px 10px #eee",    
  },
  dialogButton:{
    paddingTop: theme.spacing(6),
    justifyContent:"center",
  },
}));

const AddItemDialogue = (props) => {
  const classes = useStyles();
  const currentUser = useAuthState();
  const dispatch = useAuthDispatch();
  const {inputLink, openDialogue, closeDialogue, selectedListIndex } = props; 

  async function addButtonClick() {
      const response = await fetch("/scrape", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}` 
        },
        body: JSON.stringify({ url: inputLink })
      });
      const item = await response.json();
      console.log(item)
      
      const list_title = currentUser.list_of_products[selectedListIndex].list_title;
      addProducts(dispatch, currentUser.token, list_title, item.name, item.short_URL, item.image, item.price);



  // const res = await fetch(`/lists/`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "aplication/json",
  //     Authorization: `Bearer ${currentUser.token}`,
  //   },
  //   body: JSON.stringify(),
  // });
  // const list = await res.json();
  // console.log(list);
  };


  return (    
    <Dialog
      open={openDialogue}
      onClose={closeDialogue}
      aria-labelledby="add-item-dialog"
      aria-describedby="add-item-to-list"
      className={classes.dialog}
    >
      <DialogTitle id="alert-dialog-add-item">{"Add new Item:"}</DialogTitle>
      <DialogContent>
          <Box className={classes.boxInput}>
            <Typography variant="h6">Paste link to item:</Typography>
            <Input
              placeholder="Paste your Link here"
              disableUnderline
              className={classes.pasteLink}
              value={inputLink}
            />
          </Box>
          <Box className={classes.boxSelect}>
            <Typography variant="h6" gutterBottom>
              Select List:
            </Typography>
            <FormControl className={classes.formControl}>
              <Select
                value={selectedListIndex}
                className={classes.listDropdown}
                displayEmpty
                disableUnderline
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={'Select'} disabled>
                  Select
                </MenuItem>
                {currentUser.list_of_products.map((list, i) => (
                <MenuItem
                  key={i}                  
                  value={i}
                >{list.list_title}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </Box>
        
      </DialogContent>
      <DialogActions className={classes.dialogButton}>
        <Button
          onClick={addButtonClick}
          className={classes.addButton}
          variant="contained"
        >
          ADD ITEM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialogue;
