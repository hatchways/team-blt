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
import S3 from "react-aws-s3";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  dialog: {
    justifyContent: "center",
    textAlign: "center",
    margin: "auto",
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
  const [imageFile, setImageFile] = useState({})
  const [fileName, setFileName] = useState("")
  const [imageUrl, setImageUrl] = useState(""); //Use this with AWS and flask

  const onDrop = (acceptedFile) => {
    setImageFile(acceptedFile[0])
    setFileName(acceptedFile[0].name);
  };

  const onSubmit = (event) => {
    // Image upload post to AWS
    event.preventDefault();
    const config = {
      bucketName: `${process.env.REACT_APP_BUCKET_NAME}`,
      region: `${process.env.REACT_APP_REGION}`,
      accessKeyId: `${process.env.REACT_APP_ACCESS_ID}`,
      secretAccessKey: `${process.env.REACT_APP_ACCESS_KEY}`
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(imageFile, fileName)
    .then(data => {
      console.log(data.location)
      setImageUrl(data.location)
    })
    .catch(err => console.log(err))

    // Send post request to backend to update User model
    const user = Object.keys(Cookies.get());
    const postImage = async () => {
      const response = await fetch(`/users/:${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get(user)}`
        },
        body: JSON.stringify({profile_pic: `${imageUrl}`})
      });
      if (response.ok) {
        console.log('Success')
      } else {
        console.log(response)
      }
    }
    postImage();
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
          <Box>
            <Typography variant="h6">Profile Picture</Typography>
            <Image src={
              imageUrl ? imageUrl 
              : 'https://dealsmateprofilepic.s3.us-east-2.amazonaws.com/mr-anonymous.png'
              } alt="Profile Picture" 
            />
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
                    : acceptedFiles.map((file) => file.name)}
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
