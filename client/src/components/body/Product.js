import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Image from "material-ui-image";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: "20px",
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
    }
})
)

function Product({ productName, url, price, image, deleteProduct }) {
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
                        style={{
                            color: "#9b9a9a",
                        }}
                    >
                        {url}
                    </Typography>
                    <Typography variant="subtitle2">${price}</Typography>
                </Grid>
                <Grid item xs={4} className={classes.buttonContainer}>
                    <Button 
                        variant="outlined" 
                        size="large"
                        className={classes.button}
                        onClick={deleteProduct}
                    >
                        Remove
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Product
