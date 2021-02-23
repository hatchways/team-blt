import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Image from "material-ui-image";

const useStyles = makeStyles((theme) => ({
  dialog: {
    justifyContent: "center",
    textAlign: "center",
    margin: "auto"
  },
  addButton: {
    borderRadius: "10rem",
    backgroundColor: "#DF1B1B",
    color: "white",
  },
  boxSelect: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(3),
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

function UserSetting({ handleSetting }) {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(""); //Use this with AWS and flask

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          let src = reader.result;
          setImageUrl(src);
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  const onSubmit = (event) => {
    // Image upload post to AWS
    // Name change post to backend
  }

  return (
    <Dialog
      open={handleSetting}
      onClose={handleSetting}
      className={classes.dialog}
    >
      <DialogTitle id="alert-dialog-add-item">
        {"Setting"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box className={classes.boxInput}>
            <Typography variant="h6">Profile Picture</Typography>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29.jpg" />
          </Box>
          <Box className={classes.boxSelect}>
            <Typography variant="h6" gutterBottom>
              Add a profile picture
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
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogButton}>
        <Button
          onClick={onSubmit}
          className={classes.addButton}
          variant="contained"
          size="large"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserSetting;
