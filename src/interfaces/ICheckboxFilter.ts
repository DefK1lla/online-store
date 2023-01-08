import { ChecboxType } from "../types/filterTypes";

export interface IProps {
  items: Array<ChecboxType>,
  onChange(index: number, status: boolean): void
}