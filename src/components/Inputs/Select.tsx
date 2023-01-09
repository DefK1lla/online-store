import styles from "./style.module.scss";

import { PureComponent, ReactNode } from "react";

import { Select as MuiSelect, InputLabel, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";

import { IProps } from "../../interfaces/IInput";
import { OptionType } from "../../types/options";

export class Select extends PureComponent<IProps<OptionType>> {
  handleChange = (e: SelectChangeEvent): void => {
    this.props.onChange(e.target.value)
  }

  render(): ReactNode {
    return (
      <FormControl variant="standard">
        <InputLabel id="select-label">{this.props.label}</InputLabel>
        <MuiSelect
          className={styles.input}
          labelId="select-label"
          value={this.props.value}
          onChange={this.handleChange}
          label={this.props.label}
        >
          {
            this.props.options?.map((option: OptionType): ReactNode => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.title}
              </MenuItem>
            ))
          }
        </MuiSelect>
      </FormControl>
    )
  }
}