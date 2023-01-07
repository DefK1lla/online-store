import { Component } from "react";

import { products, categories } from "../api";

import IHomePageState from "../interfaces/IHomePageState";
import IProducts from "../interfaces/IProducts";

class Home extends Component<unknown, IHomePageState> {
  state = {
    products: [],
    categories: []
  };

  async componentDidMount(): Promise<void> {
    const prods: IProducts = await products.getAll();
    const cats: string[] = await categories.getAll();
    this.setState({
      products: prods.products,
      categories: cats.map(category => ({ title: category, checked: false }))
    });
  }

  render() {
    return (
      <div>
        Home page
      </div>
    )
  }
}

export default Home;