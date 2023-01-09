import styles from "./style.module.scss";

import { PureComponent, ReactNode } from "react";

import { Paper, Slider, Typography } from "@mui/material";

import { IProps } from "../../interfaces/ISliderFilter";

export class SliderFilter extends PureComponent<IProps> {
  static defaultProps = {
    symbol: ""
  }

  handleChange = (e: Event, newValue: number | number[]): void => {
    this.props.onChange(newValue as number[]);
  }

  render(): ReactNode {
    return (
      <Paper
        className={styles.body}
      >
        <div className={styles.header}>
          <Typography
            variant="h5"
          >
            {this.props.title}
          </Typography>
          <div className={styles.values}>
            <span>
              {this.props.symbol}
              {this.props.value[0]}
            </span>

            <span>
              {this.props.symbol}
              {this.props.value[1]}
            </span>
          </div>
        </div>
        <Slider
          className={styles.slider}
          getAriaLabel={() => this.props.title}
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </Paper>
    )
  }
}