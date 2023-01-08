import React, { PureComponent } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./style.module.scss";
import { Grid } from "@mui/material";


export class ProductItem extends PureComponent {
  render() {
    return (
      <>
        <Card className={styles.productItemContainer}>
        <Typography gutterBottom variant="h5" component="div" className={styles.productItem_title}>
            products.title 
          </Typography>
        <CardMedia
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent className={styles.productItem_description}>
          <Typography variant="body2" color="text.secondary" className={styles.productItem_description_text}>
            products.category
            products.brand
            products.price
            products.Discount
            products.rating
            products.stock
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className={styles.productItem_button}>ADD TO CART</Button>
          <Button size="small" className={styles.productItem_button}>DETAILS</Button>
        </CardActions>
      </Card>
    </>
    )
  }
};
