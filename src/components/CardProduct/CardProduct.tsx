import { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./style.module.scss";
import { IItemProps } from "../../interfaces/IProduct";
import { CardContent } from "@mui/material";

export class CardProduct extends Component<IItemProps> {
  render() {
    return (
      <>
        <Card className={styles.сardProductContainer}>
          <Typography className={styles.сardProduct_title} component="div">
            {this.props.product?.title}
          </Typography>
          <CardContent className={styles.cardProduct_content}>
            <CardMedia
              className={styles.сardProduct_img}
              image={this.props.product?.thumbnail}
            ></CardMedia>
            <Typography
              className={styles.сardProduct_description_text}
              component="div"
            >
              <div>Category: {this.props.product?.category}</div>
              <div>Brand: {this.props.product?.brand}</div>
              <div>Price: {this.props.product?.price}€</div>
              <div>Discount: {this.props.product?.discountPercentage}</div>
              <div>Raiting: {this.props.product?.rating}</div>
              <div>Stock: {this.props.product?.stock}</div>
            </Typography>
            <CardActions>
              <Button
                variant="text"
                size="small"
                className={styles.сardProduct_button}
              >
                ADD TO CART
              </Button>
            </CardActions>
          </CardContent>
          <Typography
            className={styles.cardProduct_description}
            component="div"
          >
            Description:
            <div>{this.props.product?.description}</div>
          </Typography>
          <CardContent className={styles.cardProduct_gallery}>
            <CardMedia
              component="img"
              image={this.props.product?.images[0]}
            ></CardMedia>
            <CardMedia
              component="img"
              image={this.props.product?.images[1]}
            ></CardMedia>
            <CardMedia
              component="img"
              image={this.props.product?.images[2]}
            ></CardMedia>
            <CardMedia
              component="img"
              image={this.props.product?.images[3]}
            ></CardMedia>
          </CardContent>
        </Card>
      </>
    );
  }
}
