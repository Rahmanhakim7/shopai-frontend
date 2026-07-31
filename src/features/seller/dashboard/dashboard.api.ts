import api from "@/lib/api";

export const getDashboard = async () => {
  const response = await api.get("/seller/dashboards/");
  return response.data;
};

export const getRecentOrders = async () => {
  const response = await api.get("/seller/recent-orders/");
  return response.data;
};
