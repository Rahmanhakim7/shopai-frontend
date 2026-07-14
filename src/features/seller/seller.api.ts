import api from "@/lib/api";
export const processSellerOrder = async (id: number) => {
  const res = await api.post(`/seller/orders/${id}/process/`);
  return res.data;
};

export const shipSellerOrder = async (id: number) => {
  const res = await api.post(`/seller/orders/${id}/ship/`);
  return res.data;
};