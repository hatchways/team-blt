import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Image from "material-ui-image";

const useStyles = makeStyles(() => ({
    container: {
        marginBottom: "20px",
        padding: "10px"
    },
    productInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: "20px"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    button: {
        fontSize: "0.75rem",
        margin: "auto",
    },
    link: {
        color: "#9b9a9a",
        textDecoration: "none",
        "&:hover": { color: "#E84545"}
        }
})
)

function Product({ productName, url, price, image, otherUser, deleteProduct }) {
    const classes = useStyles()

    return (
        <Paper elevation={2} className={classes.container}>
            <Grid container>
                <Grid item xs={2}>
                    <Image
                        src={image ? image 
                            : 'https://dealsmateprofilepic.s3.us-east-2.amazonaws.com/default-placeholder.png'
                        }
                    />
                </Grid>
                <Grid item xs={6} className={classes.productInfo}>
                    <Typography 
                        variant='subtitle1'
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        {productName}
                    </Typography>
                    <Typography 
                        variant="subtitle2" 
                    >
                        <a 
                            href={url.includes("https://") ? url : '//'+url} 
                            target="_blank"
                            className={classes.link}
                        >{url.substr(0, 30)}</a>
                    </Typography>
                    <Typography variant="subtitle2">${price}</Typography>
                </Grid>
                <Grid item xs={4} className={classes.buttonContainer}>
                    {otherUser ? null 
                        : <Button 
                            variant="outlined" 
                            size="large"
                            className={classes.button}
                            onClick={deleteProduct}
                        >
                            Remove
                        </Button>
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Product
