import React from 'react';
import Image from 'material-ui-image'
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useAuthDispatch, useAuthState } from '../../../context/context';
import { followFriends, unfollowFriends } from '../../../context/actions';

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: "auto",
        marginTop: "20px",
        width: "30vh",
    },
    button: {
        margin: "auto",
        marginTop: "10px",
        padding: "10px 40px 10px 40px"
    }
}))

function OtherUserProfile({ image, name, email }) {
    const classes = useStyles();
    const currentUser = useAuthState();
    const dispatch = useAuthDispatch();
    const parsedListOfFriends = currentUser.friends.map(friend => JSON.parse(friend));
    /*
    Since the current user's list of friends is an array of stringified JSON, 
    we must parse the JSON strings before comaring if the other user's email
    is present within the list of friends.
    */

    // Handling following and unfollowing of the other user in their page
    const handleFollowClick = () => {
        followFriends(dispatch, currentUser.token, email);
        };

    const handleUnfollowClick = () => {
        unfollowFriends(dispatch, currentUser.token, email);
    };

    return (
        <div className={classes.container}>
            <Image 
                src={image ? image : 'https://dealsmateprofilepic.s3.us-east-2.amazonaws.com/mr-anonymous.png'}
                imageStyle={{
                    objectFit: "cover",
                    borderRadius: "100%"
                }}
            />
            <Typography variant="h4">{name}</Typography>
            <Typography variant="subtitle2" style={{ color: "#9b9a9a"}}>{email}</Typography>
            {parsedListOfFriends.some(friend => friend.email === email) ? 
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    onClick={handleUnfollowClick}
                >
                    Unfollow
                </Button>
            : <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    onClick={handleFollowClick}
                >
                    Follow
                </Button>
            }
            
        </div>
    )
}

export default OtherUserProfile
