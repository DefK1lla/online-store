import { Component } from "react";
import { BasketList } from "../components/Basket";
import { IState } from "../interfaces/ICartPage";
import { products } from "../api";
import { ICartEvents } from "../interfaces/ICart";
import { ProductType } from "../types/productType";
import { Container } from "@mui/material";

class Cart extends Component<ICartEvents, IState> {
  state = {
    products: [],
  };

  async componentDidMount(): Promise<void> {
    const prods: ProductType[] = await products.getCartProducts();
    this.setState({
      products: prods,
    });
  }

  removeFromCart = (id: number) => {
    products.removeFromCart(id);
    this.setState(prevState => ({
      ...prevState,
      products: prevState.products.filter((prod: ProductType): boolean => prod.id !== id)
    }));
    this.props.onRemoveFromCart();
  }

  render() {
    return (
      <Container>
        <BasketList onAddToCart={this.props.onAddToCart}
          onRemoveFromCart={this.removeFromCart} products={this.state.products} />
      </Container>
    );
  }
}

export default Cart;
