import styles from "./style.module.scss";

import { PureComponent, ReactNode } from "react";

import { Container, Stack, Button } from "@mui/material";

export class Footer extends PureComponent {
  render(): ReactNode {
    return (
      <Container>
        <Stack direction="row" spacing={2} className={styles.wrapper}>
          <Button href="https://rs.school/js/" target="_blank">
            <img className={styles.courseLogo} src="https://rs.school/images/rs_school_js.svg" alt="course logo" />
          </Button>
          <div>
            <Button href="https://github.com/defk1lla" target="_blank">
              DefK1lla
            </Button>
            <Button href="https://github.com/rusland420" target="_blank">
              rusland420
            </Button>
          </div>
        </Stack>
      </Container>
    )
  }
}