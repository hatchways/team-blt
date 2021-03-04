import React, { useState} from "react";
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
import { useAuthState, useAuthDispatch } from "../../context/context";
import S3 from "react-aws-s3";
import { createProductLists} from "../../context/actions";

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
    flexDirection: "column",
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

function AddListDialogue (props) {
  const classes = useStyles();
  const { openListDialogue, closeListDialogue } = props;
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [fileName, setFileName] = useState("");
  const currentUser = useAuthState();
  const dispatch = useAuthDispatch();

  const addList = async (title, imageUrl) => {    
    createProductLists(dispatch, currentUser.token, title, imageUrl);
  };

  const amazonImageUpload = async () => {    
    const config = {
      bucketName: `${process.env.REACT_APP_BUCKET_NAME}`,
      region: `${process.env.REACT_APP_REGION}`,
      accessKeyId: `${process.env.REACT_APP_ACCESS_ID}`,
      secretAccessKey: `${process.env.REACT_APP_ACCESS_KEY}`,
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(imageFile, fileName)
      .then((data) => {
        const image = data.location;
        addList(title, image);      
      })
      .catch((err) => console.log(err));   
  }

  const onSubmit = async (event) => {
    if (title !== "") {
      if(fileName!== ""){
        // When Image is uploaded
        amazonImageUpload();
      }
      else{
        //No image Provided
        addList(title);
      }
      //Setting title and image file name to default
      setTitle("");
      setFileName("");      
    }
    closeListDialogue();
  };

  const onDrop = (acceptedFile) => {
    setImageFile(acceptedFile[0]);
    setFileName(acceptedFile[0].name);
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
          <Typography variant="h6" component="h2">
            Add a title*
          </Typography>
          <Input
            placeholder="Enter name"
            disableUnderline
            onChange={(e) => setTitle(e.target.value)}
            className={classes.inputName}
          />
        </Box>
        <Box className={classes.boxSelect}>
          <Typography variant="h6" gutterBottom component="h2">
            Add a cover
          </Typography>
          <Dropzone onDrop={onDrop} accept="image/*">
            {({ getRootProps, getInputProps, isDragReject, acceptedFiles }) => (
              <Box className={classes.imageFieldContainer} {...getRootProps()}>
                <CropOriginalIcon className={classes.dropImage} />
                <input {...getInputProps()} />
                {acceptedFiles.length === 0
                  ? "Drop an image here or select a file"
                  : acceptedFiles.map((file) => <p key={file.name}>{file.name}</p>)}
                {isDragReject && "the file type is not accepted"}
              </Box>
            )}
          </Dropzone>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogButton}>
        <Button
          onClick={onSubmit}
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
