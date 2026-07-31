import { ProductStatus } from "../constants/product-status";
import {
  ProductCondition,
  ProductConditionFilter,
} from "../constants/product-condition";
import { StockFilter } from "../constants/stock";

export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  stock: string;
  status: "active" | "inactive" | "sold_out";
  condition: ProductCondition;
};

export interface WishlistItem {
  id: number;
  product_id: number;
}

export interface ProductQueryParams {
  page?: number;
  search?: string;
  ordering?: string;
  stock_filter?: StockFilter;
  condition?: ProductConditionFilter;
}

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
