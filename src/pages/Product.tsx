import { Component } from "react";

import withRouter from "../hoc/withRouter";

import { IWithRouterProps } from "../interfaces/IWithRouterProps";
import { CardProduct } from "../components/CardProduct";
import { products } from "../api";
import IProducts from "../interfaces/IProducts";
import { IState } from "../interfaces/IProductPage";

// IWithRouterProps
class Product extends Component<IWithRouterProps, unknown, IState> {
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
    console.log(this.props.params);
    const num = Number(this.props.params?.id);
    const product = this.state.products[num - 1];
    return (
      <>
        <div>{this.props.params?.id}</div>
        <CardProduct product={product}></CardProduct>
      </>
    );
  }
}

export default withRouter(Product);
