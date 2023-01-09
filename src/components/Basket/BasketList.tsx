import { Component } from "react";
import { IListProps } from "../../interfaces/IProduct";
import { BasketItem } from "./BasketItem";
import { List, ListItem } from "@mui/material";
import { ProductType } from "../../types/productType";
import styles from "./style.module.scss";

export class BasketList extends Component<IListProps> {
  render() {
    return (
      <List>
        {this.props.products.map((product: ProductType) => (
          <ListItem key={product.id} className={styles.listContainer_item}>
            <BasketItem product={product} />
          </ListItem>
        ))}
      </List>
    );
  }
}
