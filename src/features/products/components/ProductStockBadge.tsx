import { productStockConfig } from "../constants/product-stock";

interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  const config =
    stock === 0
      ? productStockConfig.empty
      : stock <= 10
        ? productStockConfig.limited
        : productStockConfig.available;

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${config.className}`}
    >
      {stock === 0 ? "Stok Habis" : `Stok ${stock}`}
    </span>
  );
}
