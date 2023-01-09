import { Component, ReactNode } from "react";
import { IListProps } from "../../interfaces/IProduct";
import { BasketItem } from "./BasketItem";
import { List, ListItem } from "@mui/material";
import { ProductType } from "../../types/productType";
import styles from "./style.module.scss";

export class BasketList extends Component<IListProps> {
  render(): ReactNode {
    return (
      <List>
        {this.props.products.map((product: ProductType) => (
          <ListItem key={product.id} className={styles.listContainer_item}>
            <BasketItem onAddToCart={this.props.onAddToCart}
              onRemoveFromCart={this.props.onRemoveFromCart} product={product} />
          </ListItem>
        ))}
      </List>
    );
  }
}
