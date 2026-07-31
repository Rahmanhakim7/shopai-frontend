import { StockFilter } from "../constants/stock";

export const getStockFilter = (
  inStock: boolean,
  outOfStock: boolean,
): StockFilter | undefined => {
  if (inStock) {
    return "in_stock";
  }

  if (outOfStock) {
    return "out_of_stock";
  }

  return undefined;
};
