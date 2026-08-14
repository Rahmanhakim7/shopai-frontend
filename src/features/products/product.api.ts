import api from "@/lib/api";
import { Product } from "@/types/product";
import { ProductQueryParams } from "./types/product";
import { PRODUCT_REVIEW_PAGE_SIZE } from "./constants/paginations";

interface ProductResponse {
  message: string;
  data: Product;
}

interface GetSellerProductsParams {
  page: number;
  search?: string;
  status?: string;
  ordering?: string;
}

export const getSellerProducts = async (
  params: GetSellerProductsParams,
): Promise<{ results: { data: Product[] }; count: number }> => {
  const response = await api.get<{
    results: { data: Product[] };
    count: number;
  }>("/seller/products/", { params });
  return response.data;
};

export const getSellerProductDetail = async (
  id: string,
): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>(`/seller/products/${id}/`);
  return response.data;
};

export const updateSellerProduct = async (
  id: string,
  formData: FormData,
): Promise<ProductResponse> => {
  const response = await api.put<ProductResponse>(
    `/seller/products/${id}/`,
    formData,
  );
  return response.data;
};

export const createSellerProduct = async (
  formData: FormData,
): Promise<ProductResponse> => {
  const response = await api.post<ProductResponse>(
    "/seller/products/",
    formData,
  );
  return response.data;
};

export const deleteSellerProduct = async (id: number): Promise<void> => {
  await api.delete(`/seller/products/${id}/`);
};

export const getProducts = async (params: ProductQueryParams) => {
  const query = new URLSearchParams();
  if (params.page) {
    query.set("page", String(params.page));
  }
  if (params.search) {
    query.set("search", params.search);
  }
  if (params.ordering) {
    query.set("ordering", params.ordering);
  }
  if (params.stock_filter) {
    query.set("stock_filter", params.stock_filter);
  }
  if (params.condition) {
    query.set("condition", params.condition);
  }
  if (params.page_size) {
    query.set("page_size", String(params.page_size));
  }
  const response = await api.get(`/products?${query.toString()}`);
  return response.data.data;
};

export const getProductDetail = async (id: number) => {
  const response = await api.get(`/products/${id}/`);
  return response.data.data;
};

export const getProductReviews = async (id: number, page = 1) => {
  const response = await api.get(
    `/reviews/product/${id}/?page=${page}&page_size=${PRODUCT_REVIEW_PAGE_SIZE}`,
  );
  return response.data;
};
