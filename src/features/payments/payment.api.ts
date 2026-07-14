import api from "@/lib/api";

export async function createPayment(orderId: number) {
  const res = await api.post("/payments/create/", {
    order_id: orderId,
  });
  return res.data;
}

export async function getOrder(orderId: number) {
  const res = await api.get(`/orders/${orderId}/`);
  return res.data;
}
