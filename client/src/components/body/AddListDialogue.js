import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";

const useStyles = makeStyles((theme) => ({
  dialog: {
    justifyContent: "center",
    textAlign: "center",
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
  },
  boxSelect: {
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    paddingTop: theme.spacing(3),
  },
  inputName: {
    boxShadow: "0 0 5px #eee",
    width: "30rem",
    height: "3rem",
  },
  dialogButton: {
    paddingTop: theme.spacing(3),
    justifyContent: "center",
  },
  imageFieldContainer: {
    display: "flex",
    flexDirection: "column",
    width: "10rem",
    height: "7rem",
    fontSize: 14,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 5px #eee",
  },
  dropImage: {
    width: "3rem",
    height: "3rem",
  },
}));

const AddListDialogue = (props) => {
  const classes = useStyles();
  const { openListDialogue, closeListDialogue } = props;
  const [imageUrl, setimageUrl] = useState("");

  const addCloseListClick = async (e) => {
    closeListDialogue();
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          let src = reader.result;
          setimageUrl(src);
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <Dialog
      open={openListDialogue}
      onClose={closeListDialogue}
      aria-labelledby="add-item-dialog"
      aria-describedby="add-item-to-list"
      className={classes.dialog}
    >
      <DialogTitle id="alert-dialog-add-item">{"Create new list"}</DialogTitle>
      <DialogContent>
        
          <Box className={classes.boxInput}>
            <Typography variant="h6"  component="h2">Add a title*</Typography>
            <Input
              placeholder="Enter name"
              disableUnderline
              className={classes.inputName}
            />
          </Box>
          <Box className={classes.boxSelect}>
            <Typography variant="h6" gutterBottom component="h2">
              Add a cover
            </Typography>
            <Dropzone onDrop={onDrop} accept="image/*">
              {({
                getRootProps,
                getInputProps,
                isDragReject,
                acceptedFiles,
              }) => (
                <Box
                  className={classes.imageFieldContainer}
                  {...getRootProps()}
                >
                  <CropOriginalIcon className={classes.dropImage} />
                  <input {...getInputProps()} />
                  {acceptedFiles.length == 0
                    ? "Drop an image here or select a file"
                    : acceptedFiles.map((file) => <p>{file.name}</p>)}
                  {isDragReject && "the file type is not accepted"}
                </Box>
              )}
            </Dropzone>
          </Box>
        
      </DialogContent>
      <DialogActions className={classes.dialogButton}>
        <Button
          onClick={addCloseListClick}
          className={classes.addButton}
          variant="contained"
        >
          CREATE LIST
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddListDialogue;
