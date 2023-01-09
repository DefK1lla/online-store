import { MouseEventHandler, PureComponent, ReactNode } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./style.module.scss";
import { IItemProps } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";

export class ProductItem extends PureComponent<IItemProps> {
  handleClick: MouseEventHandler = (e): void => {
    if (this.props.inCart) {
      this.props.onRemoveFromCart(this.props.product.id);
    } else {
      this.props.onAddToCart(this.props.product.id);
    }
  }

  render(): ReactNode {
    return (
      <>
        <Card className={styles.productItemContainer}>
          <Typography className={styles.productItem_title}>
            {this.props.product.title}
          </Typography>
          <CardMedia
            className={styles.productItem_img}
            image={this.props.product.thumbnail}
          >
            <Typography
              className={styles.productItem_description_text}
              component="div"
            >
              <div>Category: {this.props.product.category}</div>
              <div>Brand: {this.props.product.brand}</div>
              <div>Price: {this.props.product.price}€</div>
              <div>Discount: {this.props.product.discountPercentage}</div>
              <div>Raiting: {this.props.product.rating}</div>
              <div>Stock: {this.props.product.stock}</div>
            </Typography>
          </CardMedia>
          <CardActions>
            <Button
              variant="text"
              size="small"
              className={styles.productItem_button}
              onClick={this.handleClick}
            >
              {
                this.props.inCart
                  ? <>REMOVE FROM CART</>
                  : <>ADD TO CART</>
              }
            </Button>
            <Button
              variant="text"
              size="small"
              className={styles.productItem_button}
              component={Link}
              to={`/product/${this.props.product.id}`}
            >
              DETAILS
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}
