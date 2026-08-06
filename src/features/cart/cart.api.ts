import api from "@/lib/api";

export const addToCart = async (productId: number, quantity: number) => {
  return api.post("/cart/add/", {
    product_id: productId,
    quantity,
  });
};

export const getCart = async () => {
  const res = await api.get("/cart/");
  return res.data.seller_groups;
};

export const updateCartItemApi = async (cartItemId: number, quantity: number) => {
  await api.patch(`/cart/items/${cartItemId}/`, {
    quantity,
  });
};

export const removeCartItem = async (cartItemId: number) => {
  await api.delete(`/cart/items/${cartItemId}/`);
};
