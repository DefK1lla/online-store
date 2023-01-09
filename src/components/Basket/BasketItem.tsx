import { Button, Card, CardActions, Typography } from "@mui/material";
import { PureComponent, MouseEventHandler } from "react";
import styles from "./style.module.scss";
import CardMedia from "@mui/material/CardMedia";
import { IItemProps } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";

export class BasketItem extends PureComponent<IItemProps, { count: number }> {
  state = {
    count: 1,
  };

  increment = (): void => {
    this.setState({ count: this.state.count + 1 })
  }

  decrement = (): void => {
    this.setState(prevSate => {
      if (prevSate.count === 1) {
        this.props.onRemoveFromCart(this.props.product.id)
      }

      return { count: this.state.count - 1 }
    });
  }

  handleClick: MouseEventHandler = (e): void => {
    this.props.onRemoveFromCart(this.props.product.id);
  }

  render() {
    return (
      <Card className={styles.busketItemContainer}>
        <CardMedia
          className={styles.basketItem_img}
          image={this.props.product.thumbnail}
        />
        <Typography className={styles.basketItem_description} component="div">
          <Link to={`/product/${this.props.product.id}`} className={styles.basketItem_description_block1}>
            {this.props.product.title}
          </Link>
          <div className={styles.basketItem_description_block2}>
            {this.props.product.description}
          </div>
          <div className={styles.basketItem_description_block3}>
            <div className={styles.basketItem_description_rating}>
              Rating: {this.props.product.rating}
            </div>
            <div className={styles.basketItem_description_discount}>
              Discount: {this.props.product.discountPercentage}
            </div>
          </div>

          <Button
            onClick={this.handleClick}
          >
            REMOVE FROM CART
          </Button>
        </Typography>
        <CardActions className={styles.basketItem_counter}>
          <div>Stock: {this.props.product.stock}</div>
          <div className={styles.basketItem_buttons}>
            <Button
              className={styles.basketItem_button}
              onClick={this.decrement}
            >
              -
            </Button>
            <div className={styles.basketItem_count}>{this.state.count}</div>
            <Button
              className={styles.basketItem_button}
              onClick={this.increment}
            >
              +
            </Button>
          </div>
          <div>€{this.props.product.price * this.state.count}</div>
        </CardActions>
      </Card>
    );
  }
}
