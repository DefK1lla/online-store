import { CheckboxType } from "../types/filterTypes";

export interface IProps {
  title: string,
  items: Array<CheckboxType>,
  onChange(index: number, status: boolean): void
}