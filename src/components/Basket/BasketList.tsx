import { Component } from "react";
import { IListProps } from "../../interfaces/IProduct";
import { BasketItem } from "./BasketItem";
import { List, ListItem } from "@mui/material";
import { ProductType } from "../../types/productType";

export class BasketList extends Component<IListProps> {
  render() {
    return (
      <List>
        {this.props.products.map((product: ProductType) => (
          <ListItem key={product.id}>
            <BasketItem onAddToCart={this.props.onAddToCart}
              onRemoveFromCart={this.props.onRemoveFromCart} product={product} />
          </ListItem>
        ))}
      </List>
    );
  }
}
