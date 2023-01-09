import { Component, ReactNode } from "react";

import { CheckboxFilter } from "../components/Filters";
import { Layout } from "../components/Layout";
import { Search } from "../components/Inputs";
import { ProductList } from "../components/Product";
import { Select } from "../components/Inputs";

import { products, categories } from "../api";

import { filterData } from "../utiles/helpers";

import { IState } from "../interfaces/IHomePage";
import IProducts from "../interfaces/IProducts";
import { CheckboxType } from "../types/filterTypes";
import { ProductType } from "../types/productType";

const sortOptions = {
  label: "Sort options",
  options: [
    {
      value: "desc price",
      title: "Sort by price DESC"
    },
    {
      value: "asc price",
      title: "Sort by price ASC"
    },
    {
      value: "desc rating",
      title: "Sort by rating DESC"
    },
    {
      value: "asc rating",
      title: "Sort by rating ASC"
    },
    {
      value: "desc discountPercentage",
      title: "Sort by discount DESC"
    },
    {
      value: "asc discountPercentage",
      title: "Sort by discount ASC"
    }
  ]
};

class Home extends Component<unknown, IState> {
  state = {
    products: [],
    filteredProducts: [],
    categories: [],
    brands: [],
    searchValue: "",
    sort: ""
  };

  async componentDidMount(): Promise<void> {
    const prods: IProducts = await products.getAll();
    const cats: string[] = await categories.getAll();

    this.setState({
      products: prods.products,
      filteredProducts: prods.products,
      categories: cats.map((category: string): CheckboxType => ({ title: category, checked: false })),
      brands: Array.from(
        new Set(prods.products.map(prod => prod.brand))
      ).map((brand: string): CheckboxType => ({ title: brand, checked: false }))
    });
  }

  async componentDidUpdate(prevProps: unknown, prevState: IState): Promise<void> {
    if (prevState.searchValue !== this.state.searchValue) {
      const prods: IProducts = await products.search(this.state.searchValue);
      this.setState(prevState => ({ ...prevState, products: prods.products }));
    }

    const filtersUpdated = (prevState.categories !== this.state.categories) || (prevState.brands !== this.state.brands),
      productsUpdated = (prevState.products !== this.state.products);

    if (filtersUpdated || productsUpdated) {
      this.filterProducts();
      this.sortProducts();
    }
    if (prevState.sort !== this.state.sort) {
      this.sortProducts();
    }

  }

  handleCategoryChange = (index: number, status: boolean) => {
    const prevState = { ...this.state };
    const categories: CheckboxType[] = [...prevState.categories];
    categories[index].checked = status;
    this.setState(prevState => ({ ...prevState, categories }));
  }

  handleBrandChange = (index: number, status: boolean) => {
    const prevState = { ...this.state };
    const brands: CheckboxType[] = [...prevState.brands];
    brands[index].checked = status;
    this.setState(prevState => ({ ...prevState, brands }));
  }

  filterProducts = (): void => {
    const allowedCategories = this.state.categories.filter((ct: CheckboxType) => ct.checked);
    const allowedBrands = this.state.brands.filter((br: CheckboxType) => br.checked);

    const filteredProducts = filterData<ProductType, string>({
      items: this.state.products,
      filters: [
        {
          field: "category",
          allowedValues: Array.from(allowedCategories, (x: CheckboxType) => x.title)
        },
        {
          field: "brand",
          allowedValues: Array.from(allowedBrands, (x: CheckboxType) => x.title)
        }
      ]
    });

    this.setState(prevState => ({ ...prevState, filteredProducts }));
  }

  sortProducts = (): void => {
    if (!this.state.sort) return;
    const [type, field] = this.state.sort.split(" ");
    this.setState(prevState => ({
      ...prevState, filteredProducts: prevState.filteredProducts.sort((a: ProductType, b: ProductType): number => {
        const valueA = a[field as keyof ProductType] as number,
          valueB = b[field as keyof ProductType] as number;
        return type === "asc" ? valueA - valueB : valueB - valueA;
      })
    }));
  }

  handleSearchChange = (value: string): void => {
    this.setState({ ...this.state, searchValue: value.trimStart().replace(/ {1,}/g, " ").toLowerCase() });
  }

  handleSelectChange = (value: string): void => {
    this.setState(prevState => ({ ...prevState, sort: value }));
  }

  render(): ReactNode {
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
        TopBar={
          <>
            <Search
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
            />
            <Select
              options={sortOptions.options}
              value={this.state.sort}
              onChange={this.handleSelectChange}
              label={sortOptions.label}
            />
          </>
        }
      >
        <div>
          <ProductList products={this.state.filteredProducts} />
        </div>
      </Layout >
    )
  }
}

export default Home;