import { Container, Grid,} from "@mui/material";
import { Component } from "react";
import { ProductItem } from "./ProductItem";
import styles from "./style.module.scss";
import { products } from "../../api";
import { ProductType } from "../../types/productType";


interface IProps {
  products: Array<ProductType>;
}

export class ProductList extends Component<IProps>{
  render (){
    return (
      <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12}} className={styles.listContainer}>
      {this.props.products.map((product) => (
        <Grid item xs={3} sm={2} md={3}
        className={styles.listContainer_item}>
            <ProductItem
              key={product.id}
              product={product}
            />
        </Grid>
  ))}
      </Grid>
    </>
    )
  }
}