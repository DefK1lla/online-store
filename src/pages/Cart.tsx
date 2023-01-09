import { Component } from "react";
import { BasketList } from "../components/Basket";
import { IState } from "../interfaces/ICartPage";
import { products } from "../api";
import { ICartEvents } from "../interfaces/ICart";
import { ProductType } from "../types/productType";
import { Button, Container, Typography } from "@mui/material";
import { Layout } from "../components/Layout";
import { OrderModal } from "../components/Modal";
import { IState as FormData } from "../interfaces/IOrderModal";

class Cart extends Component<ICartEvents, IState> {
  state = {
    products: [],
    total: 0,
    open: false,
    isSended: false
  };

  async componentDidMount(): Promise<void> {
    const prods: ProductType[] = await products.getCartProducts();
    this.setState({
      products: prods,
      total: prods.reduce((sum: number, prod: ProductType): number => sum + prod.price, 0)
    });
  }

  componentDidUpdate(prevProps: Readonly<ICartEvents>, prevState: Readonly<IState>): void {
    if (prevState.products !== this.state.products) {
      this.setState(prevState => ({
        ...prevState,
        total: prevState.products.reduce((sum: number, prod: ProductType): number => sum + prod.price, 0)
      }));
    }
  }

  removeFromCart = (id: number) => {
    products.removeFromCart(id);
    this.setState(prevState => ({
      ...prevState,
      products: prevState.products.filter((prod: ProductType): boolean => prod.id !== id)
    }));
    this.props.onRemoveFromCart();
  }

  handleClose = (): void => {
    this.setState(prevState => ({
      ...prevState,
      open: false
    }))
  }

  handleOpen = (): void => {
    this.setState(prevState => ({
      ...prevState,
      open: true
    }))
  }

  handleSubmit = (data: FormData): void => {
    console.log(data);
    this.setState(prevState => ({ ...prevState, products: [], isSended: true }));
    this.props.onCartReset();
    products.removeAllFromCart();
  }

  render() {
    return (
      <Container>
        <Layout
          TopBar={
            <>
              {this.state.total > 0 &&
                <>
                  <Button
                    onClick={this.handleOpen}
                  >
                    Buy now
                  </Button>

                  <Typography>
                    Total: ${this.state.total}
                  </Typography>
                </>
              }
            </>
          }
        >
          <BasketList onAddToCart={this.props.onAddToCart}
            onRemoveFromCart={this.removeFromCart} products={this.state.products} />

          <OrderModal
            isSended={this.state.isSended}
            open={this.state.open}
            onClose={this.handleClose}
            onSubmit={this.handleSubmit}
          />

          {this.state.products.length === 0 && <Typography variant="h5">Cart is empty</Typography>}
        </Layout>
      </Container>
    );
  }
}

export default Cart;
