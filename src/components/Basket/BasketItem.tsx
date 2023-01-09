import { Button, Card, CardActions, Typography } from "@mui/material";
import { PureComponent } from "react";
import styles from "./style.module.scss";
import CardMedia from "@mui/material/CardMedia";
import { IItemProps } from "../../interfaces/IProduct";

export class BasketItem extends PureComponent<IItemProps> {
  state = {
    count: 1,
  };

  render() {
    return (
      <>
        <Card className={styles.busketItemContainer}>
          <CardMedia
            className={styles.basketItem_img}
            image={this.props.product.thumbnail}
          />
          <Typography className={styles.basketItem_description} component="div">
            <div className={styles.basketItem_description_block1}>
              {this.props.product.title}
            </div>
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
          </Typography>
          <CardActions className={styles.basketItem_counter}>
            <div>Stock: {this.props.product.stock}</div>
            <div className={styles.basketItem_buttons}>
              <Button
                className={styles.basketItem_button}
                onClick={() => this.setState({ count: this.state.count - 1 })}
              >
                -
              </Button>
              <div className={styles.basketItem_count}>{this.state.count}</div>
              <Button
                className={styles.basketItem_button}
                onClick={() => this.setState({ count: this.state.count + 1 })}
              >
                +
              </Button>
            </div>
            <div>€{this.props.product.price * this.state.count}</div>
          </CardActions>
        </Card>
      </>
    );
  }
}