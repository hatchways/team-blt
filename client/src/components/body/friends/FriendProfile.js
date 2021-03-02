import React from 'react';
import Image from 'material-ui-image'
import { Box, makeStyles, Typography } from '@material-ui/core';

const friend = {
    name: "John Doe",
    profileImage: "https://www.nydailynews.com/resizer/Ee9izZJ1zk1aij0aZ0lwemFgLoQ=/800x553/top/cloudfront-us-east-1.images.arcpublishing.com/tronc/LGGTNSKXKRH6LM53TFE4VDJIYI.jpg",
    email: "johndoe@gmail.com"
}

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: "auto",
        marginTop: "20px",
        width: "30vh",
    },
}))

function FriendProfile() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Image 
                src={friend.profileImage}
                imageStyle={{
                    objectFit: "cover",
                    borderRadius: "100%"
                }}
            />
            <Typography variant="h4">{friend.name}</Typography>
            <Typography variant="subtitle2" style={{ color: "#9b9a9a"}}>{friend.email}</Typography>
        </div>
    )
}

export default FriendProfile
