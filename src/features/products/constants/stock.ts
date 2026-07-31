export const stockFilterConfig = {
  in_stock: {
    label: "Stok Tersedia",
  },
  out_of_stock: {
    label: "Stok Habis",
  },
} as const;

export type StockFilter = keyof typeof stockFilterConfig;
