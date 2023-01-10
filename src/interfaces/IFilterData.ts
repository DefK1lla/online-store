export interface IFilterData<ItemType, ValueType> {
  items: Array<ItemType>,
  filters: Array<{
    field: string,
    allowedValues: Array<ValueType>
  }>
}

export interface IRangeFIlter<ItemType> {
  items: Array<ItemType>,
  filter: {
    field: string,
    range: number[]
  }
}