export const productConditionConfig = {
  new: {
    label: "Baru",
    classNames: "bg-blue-100 text-blue-700",
  },
  used: {
    label: "Bekas",
    classNames: "bg-amber-100 text-amber-700",
  },
} as const;

export type ProductCondition = keyof typeof productConditionConfig;
export type ProductConditionFilter = ProductCondition | "";