import api from "@/lib/api";
import type { SellerOrder } from "./order.types";

export const getSellerOrders = async (): Promise<SellerOrder[]> => {
  const res = await api.get("/seller/orders/");
  return res.data.results ?? res.data;
};





export async function getOrder(id: number) {
  const res = await api.get(`/orders/${id}/`);
  return res.data;
}

export const cancelOrder = async (orderId: number) => {
  const res = await api.post(`/orders/${orderId}/cancel/`);
  return res.data;
};

export async function completeSellerOrder(id: number) {
  const res = await api.post(`/seller/orders/${id}/complete/`);
  return res.data;
}
