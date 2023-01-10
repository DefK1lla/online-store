import styles from "./style.module.scss";

import { PureComponent, ReactNode } from "react";

import { Container } from "@mui/material";
import { IProps } from "../../interfaces/ILayout";

export class Layout extends PureComponent<IProps> {
  render(): ReactNode {
    return (
      <Container>
        <div className={`${styles.wrapper} ${this.props.SideBar ? styles.wrapperFlex : null}`}>
          {this.props.SideBar &&
            <div className={styles.sidebar}>
              {this.props.SideBar}
            </div>
          }

          <div>
            {this.props.TopBar &&
              <div className={styles.topbar}>
                {this.props.TopBar}
              </div>
            }
            {this.props.children}
          </div>
        </div>
      </Container>
    )
  }
}