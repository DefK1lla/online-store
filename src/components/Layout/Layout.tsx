import styles from "./style.module.scss";

import { PureComponent } from "react";

import { Container } from "@mui/material";
import { IProps } from "../../interfaces/ILayout";

export class Layout extends PureComponent<IProps> {
  render() {
    return (
      <Container>
        <div className={styles.wrapper}>
          {this.props.SideBar &&
            <div className={styles.sidebar}>
              {this.props.SideBar}
            </div>
          }

          {this.props.children}
        </div>
      </Container>
    )
  }
}