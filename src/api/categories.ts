class Categories {
  getAll = async (): Promise<string[]> => {
    const res: Array<string> = await fetch(`${process.env.REACT_APP_BASE_URL}products/categories`).then(res => res.json());
    return res;
  };
}

export const categories = new Categories();