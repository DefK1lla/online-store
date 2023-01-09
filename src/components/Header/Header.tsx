import styles from "./style.module.scss";

import { PureComponent, ReactNode } from "react";

import { Link } from "react-router-dom";

import { AppBar, IconButton, Badge, Container, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IProps } from "../../interfaces/IHeader";

export class Header extends PureComponent<IProps> {
  render(): ReactNode {
    return (
      <AppBar
        position="static"
        className={styles.header}
      >
        <Container className={styles.container}>
          <Button
            component={Link}
            to=""
            variant="text"
            color="inherit"
          >
            Products
          </Button>

          <Badge badgeContent={this.props.cartCount} color="error">
            <IconButton component={Link} to="/cart" color="inherit" size="small">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Container>
      </AppBar>
    )
  }
}