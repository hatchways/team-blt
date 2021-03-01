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
  const { openDialogue, closeDialogue } = props;
  

  //Test code starts  
    const [inputLink, setInputLink] = useState("");
    const [item, setItem] = useState({});


    const getItem = async (input) => {
        const response = await fetch("/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: input })
        });
        return response.json();
    };
  //Test Code ends

  const addButtonClick = async (e) => {
    //closeDialogue();
    if (inputLink.length > 0) {
      //openPopup();
      const newItem = await getItem(inputLink);
      setItem(newItem);
      setInputLink("");      
  }
  let message = item.short_URL +"\n" +item.id + "\n" +item.name + "\n"+ item.image + "\n" + item.price;
  alert(message);  
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
              onChange={(e) => setInputLink(e.target.value)}
            />
          </Box>
          <Box className={classes.boxSelect}>
            <Typography variant="h6" gutterBottom>
              Select List:
            </Typography>
            <FormControl className={classes.formControl}>
              <Select
                value={"Select"}
                className={classes.listDropdown}
                displayEmpty
                disableUnderline
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"Select"} disabled>
                  Select
                </MenuItem>
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
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
