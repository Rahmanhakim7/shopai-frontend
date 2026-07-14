import api from "@/lib/api";

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
