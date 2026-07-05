import api from "@/lib/api";
import { Product } from "@/types/product";

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
