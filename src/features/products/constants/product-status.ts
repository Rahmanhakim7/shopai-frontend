export const productStatusConfig = {
  active: {
    label: "Aktif",
    classNames: "bg-green-100 text-green-700",
  },
  inactive: {
    label: "Nonaktif",
    classNames: "bg-zinc-100 text-zinc-600",
  },
  sold_out: {
    label: "Sold Out",
    classNames: "bg-orange-100 text-orange-700",
  },
} as const;


export type ProductStatus = keyof typeof productStatusConfig;

