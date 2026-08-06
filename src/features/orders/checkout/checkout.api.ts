import api from "@/lib/api";

export async function createOrder(
  items: {
    product_id: number;
    quantity: number;
  }[],
) {
  const { data } = await api.post("/orders/create/", {
    items,
  });

  return data;
}
