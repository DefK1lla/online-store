import { Component } from "react";

import { Container } from "@mui/material";

import withRouter from "../hoc/withRouter";

import { Loader } from "../components/Loader";

import { IWithRouterProps } from "../interfaces/IWithRouterProps";
import { CardProduct } from "../components/CardProduct";
import { products } from "../api";
import { ProductType } from "../types/productType";
import { IState } from "../interfaces/IProductPage";
import { ICartEvents } from "../interfaces/ICart";

class Product extends Component<ICartEvents & IWithRouterProps, IState> {
  state = {
    product: {
      id: 0,
      title: "",
      brand: "",
      description: "",
      discountPercentage: 0,
      images: [],
      price: 0,
      rating: 0,
      stock: "",
      thumbnail: "",
      category: ""
    },
    inCart: false,
    isFetching: true
  }
  async componentDidMount(): Promise<void> {
    this.setState(prevState => ({ ...prevState, isFetching: true }));
    const prod: ProductType = await products.getOneById(+this.props.params.id);
    if (!prod.id) {
      this.props.navigate("404");
    }
    const inCart: number[] = (await products.getCartProducts()).map((prod: ProductType): number => prod.id);
    this.setState({
      product: prod,
      inCart: inCart.includes(+this.props.params.id),
      isFetching: false
    });
  }

  handleRemove = (): void => {
    this.setState(prevState => ({ ...prevState, inCart: false }));
    this.props.onRemoveFromCart();
  }

  handleAdd = (): void => {
    this.setState(prevState => ({ ...prevState, inCart: true }));
    this.props.onAddToCart();
  }

  render() {
    return (
      <Container>
        {this.state.isFetching ?
          <Loader />
          : <CardProduct product={this.state.product} onAddToCart={this.handleAdd}
            onRemoveFromCart={this.handleRemove} inCart={this.state.inCart} />
        }
      </Container>
    );
  }
}

export default withRouter(Product);
