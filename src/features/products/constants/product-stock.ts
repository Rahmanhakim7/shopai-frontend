export const productStockConfig = {
  available: {
    className: "bg-green-100 text-green-700",
  },
  limited: {
    className: "bg-orange-100 text-orange-700",
  },
  empty: {
    className: "bg-red-100 text-red-700",
  },
} as const;
