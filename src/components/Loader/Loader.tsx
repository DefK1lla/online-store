import styles from "./style.module.scss";

import { PureComponent, ReactNode } from "react";

import { CircularProgress } from "@mui/material";

export class Loader extends PureComponent {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        <CircularProgress />
      </div>
    )
  }
}