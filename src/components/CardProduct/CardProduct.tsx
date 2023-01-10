import { Component, ReactNode, MouseEventHandler } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./style.module.scss";
import { IItemProps } from "../../interfaces/IProduct";
import { CardContent } from "@mui/material";

export class CardProduct extends Component<IItemProps> {
  handleClick: MouseEventHandler = (e): void => {
    if (this.props.inCart) {
      this.props.onRemoveFromCart(this.props.product.id);
    } else {
      this.props.onAddToCart(this.props.product.id);
    }
  }
  render(): ReactNode {
    return (
      <Card className={styles.сardProductContainer}>
        <Typography className={styles.сardProduct_title} component="div">
          {this.props.product?.title}
        </Typography>
        <div className={styles.cardProduct_content_wrapper}>
          <CardMedia
            className={styles.сardProduct_img}
            image={this.props.product?.thumbnail}
          />
          <CardContent>
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
          </CardContent>
          <CardActions>
            <Button
              variant="text"
              size="small"
              className={styles.сardProduct_button}
              onClick={this.handleClick}
            >
              {
                this.props.inCart
                  ? <>REMOVE FROM CART</>
                  : <>ADD TO CART</>
              }
            </Button>
          </CardActions>
        </div>
        <Typography
          className={styles.cardProduct_description}
          component="div"
        >
          Description:
          <div>{this.props.product?.description}</div>
        </Typography>
        <div className={styles.images}>
          {this.props.product.images.map((img: string): ReactNode =>
            <img key={img} src={img} alt="" />
          )}
        </div>
      </Card>
    );
  }
}