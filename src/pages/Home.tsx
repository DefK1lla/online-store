import { Component, ReactNode } from "react";

import { CheckboxFilter } from "../components/Filters";
import { SliderFilter } from "../components/Filters/SliderFilter";
import { Layout } from "../components/Layout";
import { Search } from "../components/Inputs";
import { ProductList } from "../components/Product";
import { Select } from "../components/Inputs";

import { products, categories } from "../api";

import { filterData, rangeFilter } from "../utiles/helpers";

import { IState } from "../interfaces/IHomePage";
import IProducts from "../interfaces/IProducts";
import { CheckboxType } from "../types/filterTypes";
import { ProductType } from "../types/productType";
import { ICartEvents } from "../interfaces/ICart";

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

class Home extends Component<ICartEvents, IState> {
  state = {
    products: [],
    filteredProducts: [],
    categories: [],
    brands: [],
    searchValue: "",
    sort: "",
    priceSlider: {
      min: 0,
      max: 0,
      value: []
    },
    stockSlider: {
      min: 0,
      max: 0,
      value: []
    },
    cartProductIds: []
  };

  async componentDidMount(): Promise<void> {
    const prods: IProducts = await products.getAll();
    const prodsInCart: ProductType[] = await products.getCartProducts();
    const cats: string[] = await categories.getAll();

    this.setState({
      products: prods.products,
      filteredProducts: prods.products,
      categories: cats.map((category: string): CheckboxType => ({ title: category, checked: false })),
      brands: Array.from(
        new Set(prods.products.map(prod => prod.brand))
      ).map((brand: string): CheckboxType => ({ title: brand, checked: false })),
      priceSlider: {
        min: 0,
        max: Math.max(...Array.from(prods.products, prod => prod.price)),
        value: [
          0,
          Math.max(...Array.from(prods.products, prod => prod.price))
        ]
      },
      stockSlider: {
        min: 0,
        max: Math.max(...Array.from(prods.products, prod => +prod.stock)),
        value: [
          0,
          Math.max(...Array.from(prods.products, prod => +prod.stock))
        ]
      },
      cartProductIds: prodsInCart.map((prod: ProductType): number => prod.id)
    });
  }

  async componentDidUpdate(prevProps: unknown, prevState: IState): Promise<void> {
    if (prevState.searchValue !== this.state.searchValue) {
      const prods: IProducts = await products.search(this.state.searchValue);
      this.setState(prevState => ({ ...prevState, products: prods.products }));
    }

    const filtersUpdated = (prevState.categories !== this.state.categories) || (prevState.brands !== this.state.brands),
      productsUpdated = (prevState.products !== this.state.products),
      sortUpdated = prevState.sort !== this.state.sort,
      silderUpdated = prevState.priceSlider !== this.state.priceSlider || prevState.stockSlider !== this.state.stockSlider,
      checkboxesUpdated = prevState.categories !== this.state.categories || prevState.brands !== this.state.brands;

    if (filtersUpdated || productsUpdated || sortUpdated || silderUpdated || checkboxesUpdated) {
      this.updateProducts();
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

  updateProducts = (): void => {
    let filteredProducts = this.filterProducts(this.state.products);
    filteredProducts = this.sortProducts(filteredProducts);
    this.setState(prevState => ({ ...prevState, filteredProducts }));
  }

  filterProducts = (products: Array<ProductType>): Array<ProductType> => {
    const allowedCategories = this.state.categories.filter((ct: CheckboxType) => ct.checked);
    const allowedBrands = this.state.brands.filter((br: CheckboxType) => br.checked);

    let filteredProducts = filterData<ProductType, string>({
      items: products,
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
    filteredProducts = rangeFilter<ProductType>({
      items: filteredProducts,
      filter: {
        field: "price",
        range: this.state.priceSlider.value
      }
    });
    filteredProducts = rangeFilter<ProductType>({
      items: filteredProducts,
      filter: {
        field: "stock",
        range: this.state.stockSlider.value
      }
    });
    return filteredProducts;
  }

  sortProducts = (products: Array<ProductType>): Array<ProductType> => {
    if (!this.state.sort) return products;
    const [type, field] = this.state.sort.split(" ");
    return products.sort((a: ProductType, b: ProductType): number => {
      const valueA = a[field as keyof ProductType] as number,
        valueB = b[field as keyof ProductType] as number;
      return type === "asc" ? valueA - valueB : valueB - valueA;
    });
  }

  handleSearchChange = (value: string): void => {
    this.setState({ ...this.state, searchValue: value.trimStart().replace(/ {1,}/g, " ").toLowerCase() });
  }

  handleSelectChange = (value: string): void => {
    this.setState(prevState => ({ ...prevState, sort: value }));
  }

  handleSilderChange = (value: number[]): void => {
    this.setState(prevState => ({ ...prevState, priceSlider: { ...prevState.priceSlider, value: value } }));
  }

  handleStockChange = (value: number[]): void => {
    this.setState(prevState => ({ ...prevState, stockSlider: { ...prevState.stockSlider, value: value } }));
  }

  removeFromCart = (id: number): void => {
    this.setState(prevState => ({
      ...prevState,
      cartProductIds: prevState.cartProductIds.filter((item: number): boolean => item !== id)
    }))
    this.props.onRemoveFromCart();
    products.removeFromCart(id);
  }

  addToCart = (id: number): void => {
    this.setState(prevState => ({
      ...prevState,
      cartProductIds: [...prevState.cartProductIds, id]
    }));
    this.props.onAddToCart();
    products.addToCart(id);
  }

  render(): ReactNode {
    return (
      <Layout
        SideBar={
          <>
            <CheckboxFilter
              title="Category"
              items={this.state.categories}
              onChange={this.handleCategoryChange}
            />
            <CheckboxFilter
              title="Brand"
              items={this.state.brands}
              onChange={this.handleBrandChange}
            />

            <SliderFilter
              title="Price"
              min={this.state.priceSlider.min}
              max={this.state.priceSlider.max}
              value={this.state.priceSlider.value}
              onChange={this.handleSilderChange}
              symbol="$"
            />

            <SliderFilter
              title="Stock"
              min={this.state.stockSlider.min}
              max={this.state.stockSlider.max}
              value={this.state.stockSlider.value}
              onChange={this.handleStockChange}
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
        <>
          <ProductList
            onAddToCart={this.addToCart}
            onRemoveFromCart={this.removeFromCart}
            inCart={this.state.cartProductIds}
            products={this.state.filteredProducts}
          />
        </>
      </Layout >
    )
  }
}

export default Home;