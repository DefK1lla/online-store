import { CheckboxType } from "../types/filterTypes";

export interface IProps {
  items: Array<CheckboxType>,
  onChange(index: number, status: boolean): void
}