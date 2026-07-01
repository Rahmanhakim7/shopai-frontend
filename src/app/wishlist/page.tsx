"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import BuyerLayout from "@/layouts/buyerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface WishlistItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  seller_name: string;
}
const getImageUrl = (image?: string) => {
  if (!image) return null;
  return image.startsWith("http") ? image : `${API_URL}${image}`;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const fetchWishlist = async () => {
    try {
      const res = await api.get<WishlistItem[]>("/wishlist/");
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed fetch wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (productId: number) => {
    try {
      await api.delete(`/wishlist/${productId}/`);
      setWishlist((prev) =>
        prev.filter((item) => item.product_id !== productId),
      );
    } catch (err) {
      console.error("Delete wishlist error", err);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") return;
    const loadFetchWishlist = async () => {
      fetchWishlist();
    };
    loadFetchWishlist();
  }, [authLoading, user]);

  if (loading) {
    return (
      <RoleGuard role="buyer">
        <BuyerLayout>
          <div className="flex items-center justify-center py-20 text-gray-500">
            Loading wishlist...
          </div>
        </BuyerLayout>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="mx-auto max-w-7xl p-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              {wishlist.length} Items
            </span>
          </div>
          {wishlist.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="text-gray-500">Wishlist kamu masih kosong</p>
              <button
                onClick={() => router.push("/products")}
                className="mt-4 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {wishlist.map((item) => {
                const imageUrl = getImageUrl(item.image);
                return (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/products/${item.product_id}`)}
                    className="group cursor-pointer overflow-hidden rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-44 overflow-hidden rounded-2xl bg-gray-100">
                      <div className="absolute top-3 left-3 z-10 rounded-full bg-black/70 px-2 py-1 text-[10px] text-white">
                        {item.seller_name}
                      </div>

                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col p-2 pt-4">
                      <h2 className="line-clamp-2 text-base font-semibold text-gray-800">
                        {item.name}
                      </h2>

                      <p className="mt-3 text-xl font-bold text-green-600">
                        Rp {item.price.toLocaleString()}
                      </p>

                      <span
                        className={`mt-2 inline-flex w-fit rounded-full px-2 py-1 text-xs ${
                          item.stock > 10
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        Stock {item.stock}
                      </span>
                      <div className="mt-4">
                        <Button
                          variant="danger"
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeWishlist(item.product_id);
                          }}
                        >
                          Remove Wishlist
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
