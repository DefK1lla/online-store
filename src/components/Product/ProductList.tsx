import { Grid, Typography } from "@mui/material";
import { Component } from "react";
import { ProductItem } from "./ProductItem";
import styles from "./style.module.scss";
import { ProductType } from "../../types/productType";
import { IListProps } from "../../interfaces/IProduct";

export class ProductList extends Component<IListProps>{
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
                  product={product}
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