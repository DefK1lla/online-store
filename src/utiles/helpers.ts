import { IFilterData } from "../interfaces/IFilterData";

export function filterData<ItemType, ValueType>(params: IFilterData<ItemType, ValueType>): Array<ItemType> {
  return params.items.filter((item: ItemType): boolean => {
    for (const filter of params.filters) {
      if (filter.allowedValues.length) {
        const value = item[filter.field as keyof ItemType];
        if (!filter.allowedValues.includes(value as ValueType)) {
          return false;
        }
      }
    }
    return true;
  });
}