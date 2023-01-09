import { Component } from "react";
import { BasketList } from "../components/Basket";
import { IState } from "../interfaces/ICartPage";
import { products } from "../api";
import IProducts from "../interfaces/IProducts";

class Cart extends Component<unknown, IState> {
  state = {
    products: [],
  };

  async componentDidMount(): Promise<void> {
    const prods: IProducts = await products.getAll();
    this.setState({
      products: prods.products,
    });
  }

  render() {
    return (
      <>
        <div>Cart pagee</div>
        <BasketList products={this.state.products}></BasketList>
      </>
    );
  }
}

export default Cart;
