import { Grid } from "@mui/material";
import { Component } from "react";
import { ProductItem } from "./ProductItem";
import styles from "./style.module.scss";
import { ProductType } from "../../types/productType";
import { IListProps } from "../../interfaces/IProduct";

export class ProductList extends Component<IListProps>{
  render() {
    return (
      <>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className={styles.listContainer}>
          {this.props.products.map((product: ProductType) => (
            <Grid item
              xs={12}
              sm={4}
              md={3}
              key={product.id}
              className={styles.listContainer_item}>
              <ProductItem
                product={product}
              />
            </Grid>
          ))}
        </Grid>
      </>
    )
  }
}