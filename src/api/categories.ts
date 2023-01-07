class Categories {
  getAll = async (): Promise<string[]> => {
    const res: Array<string> = await fetch("https://dummyjson.com/products/categories").then(res => res.json());
    return res;
  };
}

export const categories = new Categories();