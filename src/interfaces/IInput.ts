import { ChangeEvent } from "react";

export interface IProps<OptionType = unknown> {
  value: string,
  onChange(newValue: string): void,
  options?: Array<OptionType>,
  label?: string
}