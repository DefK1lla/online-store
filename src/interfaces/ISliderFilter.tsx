export interface IProps {
  title: string,
  value: number[],
  min: number,
  max: number,
  symbol: string,
  onChange(newValue: number[]): void
}