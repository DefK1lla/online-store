import { Component } from "react";

import { CheckboxFilter } from "../components/Filters";
import { Layout } from "../components/Layout";

import { products, categories } from "../api";

import { IState } from "../interfaces/IHomePage";
import IProducts from "../interfaces/IProducts";
import { ChecboxType } from "../types/filterTypes";

class Home extends Component<unknown, IState> {
  state = {
    products: [],
    categories: [],
    brands: []
  };

  async componentDidMount(): Promise<void> {
    const prods: IProducts = await products.getAll();
    const cats: string[] = await categories.getAll();
    this.setState({
      products: prods.products,
      categories: cats.map((category: string): ChecboxType => ({ title: category, checked: false })),
      brands: Array.from(
        new Set(prods.products.map(prod => prod.brand))
      ).map((brand: string): ChecboxType => ({ title: brand, checked: false }))
    });
  }

  handleCategoryChange = (index: number, status: boolean) => {
    this.setState(prevState => {
      const cat = [...prevState.categories];
      cat[index].checked = status;
      return { ...prevState, categories: cat };
    });
  }

  handleBrandChange = (index: number, status: boolean) => {
    this.setState(prevState => {
      const brand = [...prevState.brands];
      brand[index].checked = status;
      return { ...prevState, brands: brand };
    });
  }

  render() {
    return (
      <Layout
        SideBar={
          <>
            <CheckboxFilter
              items={this.state.categories}
              onChange={this.handleCategoryChange}
            />
            <CheckboxFilter
              items={this.state.brands}
              onChange={this.handleBrandChange}
            />
          </>
        }
      >
        tedasasdasdst
      </Layout>
      <div>
        Home page
      </div>
    )
  }
}

export default Home;