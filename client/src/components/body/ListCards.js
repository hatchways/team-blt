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
import clothes from "../../assets/images/5dfa173f119c57f532759914d338da28266bb292.png";
import home from "../../assets/images/9ccdc92261774b8464089ca77e97c10d471aabc4.png";
import tech from "../../assets/images/97aa298d2435a53db75c9e94be65246961a439aa.png";

const defaultLists = [
  {
    name: "Home",
    img: home,
  },
  {
    name: "Technology",
    img: tech,
  },
  {
    name: "Clothes",
    img: clothes,
  },
];

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
  //  border: "1px solid green",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  root: {
    maxWidth: 200,
    maxHeight: 340,
    flexGrow: "1",
    marginRight: "1rem",
    minWidth: 100,
    marginTop:"1rem",
  },
  media: {
    height: 250,
  },
  content: {
    textAlign: "center",
  },
}));

const ListCards = ({ otherUser }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.cardContainer}>
      {otherUser ?
      otherUser.list_of_products.filter(list => list.private != true).map(list => (
        <ProductListCard
          key={list._id.$oid}
          listTitle={list.list_title}
          cover_image_url={list.cover_image_url}
          numberOfProducts={list.products.length}
          otherUser={otherUser}
        />
      ))
      : currentUser.list_of_products.map((list) => (
        <ProductListCard
          key={list._id.$oid}
          listTitle={list.list_title}
          cover_image_url={list.cover_image_url}
          numberOfProducts={list.products.length}
          privateList={list.private}
        />
      ))}
      {otherUser ? null : <AddNewList />}
    </Grid>
  );
};

export default ListCards;
