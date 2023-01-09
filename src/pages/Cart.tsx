import { Component } from "react";
import { BasketList } from "../components/Basket";
import { IState } from "../interfaces/ICartPage";
import { products } from "../api";
import IProducts from "../interfaces/IProducts";
import { ICartEvents } from "../interfaces/ICart";

class Cart extends Component<ICartEvents, IState> {
  state = {
    products: [],
  };

  async componentDidMount(): Promise<void> {
    const prods: IProducts = await products.getAll();
    this.setState({
      products: prods.products,
    });
  }

  setCardProductIds() { return }

  render() {
    return (
      <>
        <div>Cart pagee</div>
        <BasketList onAddToCart={this.props.onAddToCart}
          onRemoveFromCart={this.props.onRemoveFromCart} products={this.state.products}></BasketList>
      </>
    );
  }
}

export default Cart;
