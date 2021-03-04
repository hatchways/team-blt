import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import ProductListContainer from "./ProductListContainer";

const useStyles = makeStyles((theme) => ({
    root: {
      width: "250px",
      height: "350px",
      marginRight: "1rem",
      marginTop: "1rem",
      
    },
    media: {
      height: 250,
    },
    content: {
      textAlign: "center",
    },
  }));

function ProductListCard({ listTitle, cover_image_url, numberOfProducts, privateList, otherUser }) {
    const classes = useStyles();
    // Handling product list modal
    const [openList, setOpenList] = useState(false)
    const handleList = (event) => {
        event.preventDefault();
        if (openList) {
          setOpenList(false);
        } else {
          setOpenList(true);
        }
    };

    return (
        <>
            <Card className={classes.root} onClick={handleList}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={
                    cover_image_url ? cover_image_url 
                    : 'https://dealsmateprofilepic.s3.us-east-2.amazonaws.com/default-placeholder.png'
                }
                />
                <CardContent className={classes.content}>
                <Typography gutterBottom variant="h6" >
                    {listTitle}
                </Typography>
                <Typography gutterBottom variant="caption">
                    {numberOfProducts} Items
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            {openList ? 
            <ProductListContainer 
                listTitle={listTitle}
                numberOfProducts={numberOfProducts} 
                handleList={handleList}
                openList={openList}
                privateList={privateList}
                otherUser={otherUser}
            /> : null}
        </>
    )
}

export default ProductListCard
