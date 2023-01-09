import styles from "./style.module.scss";

import { PureComponent, ReactNode } from "react";

import { AppBar, IconButton, Badge, Container } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IProps } from "../../interfaces/IHeader";

export class Header extends PureComponent<IProps> {
  render(): ReactNode {
    return (
      <AppBar
        position="static"
        className={styles.header}
      >
        <Container>
          <Badge badgeContent={this.props.cartCount} color="error">
            <IconButton color="inherit" size="small">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Container>
      </AppBar>
    )
  }
}