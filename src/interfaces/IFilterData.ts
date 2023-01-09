export interface IFilterData<ItemType, ValueType> {
  items: Array<ItemType>,
  filters: Array<{
    field: string,
    allowedValues: Array<ValueType>
  }>
}