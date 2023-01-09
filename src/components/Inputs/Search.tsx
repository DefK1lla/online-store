import styles from "./style.module.scss";

import { PureComponent, ChangeEvent, ReactNode } from "react";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { IProps } from "../../interfaces/IInput";

export class Search extends PureComponent<IProps> {
  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(e.target.value);
  }
  render(): ReactNode {
    return (
      <div
        className={styles.searchWrapper}
      >
        <SearchIcon
          className={styles.searchIcon}
        />
        <TextField
          value={this.props.value}
          onChange={this.handleChange}
          label="Search" variant="standard"
        />
      </div>
    );
  }
}