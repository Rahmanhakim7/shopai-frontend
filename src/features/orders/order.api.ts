import api from "@/lib/api";
import type { PaginatedResponse, Order } from "./order.types";

export const getSellerOrders = async (
  page = 1,
): Promise<PaginatedResponse<Order>> => {
  const res = await api.get(`/seller/orders/?page=${page}`);
  return res.data;
};

export async function getOrder(id: number) {
  const res = await api.get(`/orders/${id}/`);
  return res.data;
}

export const processSellerOrder = async (id: number) => {
  const res = await api.post(`/seller/orders/${id}/process/`);
  return res.data;
};

export const shipSellerOrder = async (id: number) => {
  const res = await api.post(`/seller/orders/${id}/ship/`);
  return res.data;
};

export const cancelOrder = async (orderId: number) => {
  const res = await api.post(`/orders/${orderId}/cancel/`);
  return res.data;
};

export async function completeSellerOrder(id: number) {
  const res = await api.post(`/seller/orders/${id}/complete/`);
  return res.data;
}
