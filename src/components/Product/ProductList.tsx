import { Container, Grid,} from "@mui/material";
import { Component } from "react";
import { ProductItem } from "./ProductItem";
import styles from "./style.module.scss";
import { products } from "../../api";


export class ProductList extends Component{


  render (){
    return (
      <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12}} className={styles.listContainer}>
      {Array.from(Array(20)).map((_, index) => (
        <Grid item xs={3} sm={3} md={3} key={index} className={styles.listContainer_item}>
            <ProductItem></ProductItem>
        </Grid>
  ))}
      </Grid>
    </>
    )
  }
}