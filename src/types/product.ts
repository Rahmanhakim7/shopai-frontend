import type { ProductStatus } from "@/features/products/constants/product-status";
import type { ProductCondition } from "@/features/products/constants/product-condition";

export type ProductItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  seller_name: string;
  condition: string;
  average_rating: string;
  review_count: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
  seller_name: string;
  condition: ProductCondition;
  average_rating: string;
  review_count: string;
};
