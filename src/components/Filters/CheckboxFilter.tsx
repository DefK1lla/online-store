import styles from "./style.module.scss";

import { PureComponent, ChangeEvent, ReactNode } from "react";

import { FormGroup, FormControlLabel, Checkbox, Paper } from "@mui/material";

import { IProps } from "../../interfaces/ICheckboxFilter";
import { ChecboxType } from "../../types/filterTypes";

export class CheckboxFilter extends PureComponent<IProps> {
  handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(index, e.target.checked);
  }

  render() {
    return (
      <Paper className={styles.body}>
        <FormGroup>
          {this.props.items.map((category: ChecboxType, index: number): ReactNode => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={category.checked}
                    onChange={this.handleChange(index)}
                  />
                }
                label={category.title}
              />
            )
          })}
        </FormGroup>
      </Paper>
    )
  }
}

