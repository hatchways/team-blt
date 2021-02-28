import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import AddNewList from "../../components/body/AddNewList";
import { useAuthState } from "../../context/context";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  root: {
    width: "250px",
    height: "350px",
    marginRight: "1rem",
    marginTop:"1rem",
  },
  media: {
    height: 250,
  },
  content: {
    textAlign: "center",
  },
}));

const ListCards = () => {
  const classes = useStyles();
  const currentUser = useAuthState();

  return (
      
      
    <Grid className={classes.cardContainer}>    
      {currentUser.list_of_products.map((list) => (
        <Card className={classes.root} key={list._id.$oid}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={
                list.cover_image_url ? list.cover_image_url 
                : 'https://dealsmateprofilepic.s3.us-east-2.amazonaws.com/default-placeholder.png'
              }
              title="Contemplative Reptile"
            />
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h6" >
                {list.list_title}
              </Typography>
              <Typography gutterBottom variant="caption">
                {list.products.length} Items
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <AddNewList />
    </Grid>
  );
};

export default ListCards;
