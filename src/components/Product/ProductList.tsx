import { Grid, Typography } from "@mui/material";
import { PureComponent } from "react";
import { ProductItem } from "./ProductItem";
import styles from "./style.module.scss";
import { ProductType } from "../../types/productType";
import { IListProps } from "../../interfaces/IProduct";

export class ProductList extends PureComponent<IListProps>{
  render() {
    return (
      <>
        {this.props.products.length > 0 &&
          <Grid
            className={styles.listContainer}
            container
            spacing={{ xs: 2, md: 3 }}
          >
            {this.props.products.map((product: ProductType) => (
              <Grid item
                xs={12} sm={6} md={4} lg={4}
                key={product.id}
                className={styles.listContainer_item}>
                <ProductItem
                  onAddToCart={this.props.onAddToCart}
                  onRemoveFromCart={this.props.onRemoveFromCart}
                  product={product}
                  inCart={this.props.inCart?.includes(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        }

        {!this.props.products.length &&
          <Typography
            variant="h3"
          >
            No products found
          </Typography>
        }
      </>
    )
  }
}