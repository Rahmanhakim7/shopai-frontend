import {
  productStatusConfig,
  ProductStatus,
} from "../constants/product-status";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

export default function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {
  const config = productStatusConfig[status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${config.classNames}`}
    >
      {config.label}
    </span>
  );
}
