import api from "@/lib/api";
import { WishlistResponse } from "./wishlist.types";

export const getWishlist = async (page = 1) => {
  const res = await api.get<WishlistResponse>(`/wishlist/?page=${page}`);
  return res.data;
};

export const deleteWishlist = async (productId: number) => {
  await api.delete(`/wishlist/${productId}/`);
};
