import { Component } from "react";

import { products } from "../api";

import IProducts from "../interfaces/IProducts";

import { ProductItem } from "../components/Product";

import { ProductList } from "../components/Product";

class Home extends Component<{}, IProducts> {
  state = {
    limit: 0,
    products: [],
    skip: 0,
    total: 0
  };

  async componentDidMount(): Promise<void> {
    const prods: IProducts = await products.getAll();
    this.setState(prods);
  }

  render() {
    return (
      <div>
        Home page
        < ProductList />
      </div>
    )
  }
}

export default Home;