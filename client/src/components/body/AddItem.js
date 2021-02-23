import React, { useState } from "react";
import {
  Grid,
  Input,
  FormControl,
  Select,
  InputLabel,
  Button,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddItemDialogue from "./AddItemDialogue";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3rem",
  },
  addLinks: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: "3rem",
    overflow: "hidden",
    height: "4rem",
    padding: "0 0.5rem",
    borderRadius: "10rem",
    boxShadow: "0 0 0.5rem 1px #eee",
  },
  pasteLink: {
    width: "100%",
    height: "100%",
    borderRight: "1px solid #eee",
    paddingLeft: "1rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  listDropdown: {
    width: "7rem",
    height: "100%",
    marginRight: "1rem",
    marginBottom: "1rem",
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
    width: "10rem",
    height: "3rem",
    marginTop:"3.5em",
  },
}));

const AddItem = () => {
  const classes = useStyles();
  const [openDialogue, setOpenDialogue] = useState(false);
  const openItemDialogue = ()=> setOpenDialogue(true);
  const closeDialogue = ()=> setOpenDialogue(false);

  const addButtonClick = async (e) => {
    openItemDialogue();
    console.log("Button Clicked, Magic happens here! Itm");     
  };

  return (
    <Grid className={classes.container}>
      <Grid item xs={12}>
        <h2>Add new item:</h2>
      </Grid>

      <Grid className={classes.addLinks}>
       
          <Input
            placeholder="Paste your Link here"
            disableUnderline
            className={classes.pasteLink}
          />
     

       
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.border}>Select List</InputLabel>
            <Select
              className={classes.listDropdown}
              displayEmpty
              disableUnderline
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Select List
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        

        
          <Button
            onClick={addButtonClick}
            className={classes.addButton}
            variant="contained"
          >
            ADD
          </Button>
        

        {
           <AddItemDialogue {...{openDialogue, closeDialogue}}/>
        }
      </Grid>
    </Grid>
  );
};

export default AddItem;
