import {
  productConditionConfig,
  type ProductCondition,
} from "../constants/product-condition";

interface ProductConditionBadgeProps {
  condition: ProductCondition;
}

export default function ProductConditionBadge({
  condition,
}: ProductConditionBadgeProps) {
  const config = productConditionConfig[condition];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${config.classNames}`}
    >
      {config.label}
    </span>
  );
}
