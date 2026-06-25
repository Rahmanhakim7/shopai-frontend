"use client";

import { useEffect, useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
type CartItem = {
  cart_item_id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  subtotal: number;
};

type CartSeller = {
  seller_id: number;
  seller_name: string;
  items: CartItem[];
  seller_total: number;
};

const MEDIA_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const [cart, setCart] = useState<CartSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const selectAll =
    cart.length > 0 &&
    cart
      .flatMap((s) => s.items.map((i) => i.cart_item_id))
      .every((id) => selectedItems.includes(id));

  const selectedSellers = cart.reduce<number[]>((acc, seller, idx) => {
    const ids = seller.items.map((i) => i.cart_item_id);
    if (ids.length > 0 && ids.every((id) => selectedItems.includes(id))) {
      acc.push(idx);
    }
    return acc;
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart/");
      setCart(res.data.seller_groups);
    } catch (err) {
      console.error("Failed load cart", err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      await api.delete(`/cart/items/${cartItemId}/`);
      setSelectedItems((prev) => prev.filter((id) => id !== cartItemId));
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };
    loadCart();
  }, []);

  const format = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(n);

  const updateCartItem = async (cartItemId: number, quantity: number) => {
    try {
      await api.patch(`/cart/items/${cartItemId}/`, { quantity });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSeller = (sellerIdx: number) => {
    const seller = cart[sellerIdx];
    const ids = seller.items.map((i) => i.cart_item_id);

    const isSelected = selectedSellers.includes(sellerIdx);

    if (isSelected) {
      setSelectedItems((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedItems((prev) => [...new Set([...prev, ...ids])]);
    }
  };
  const toggleAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const all = cart.flatMap((s) => s.items.map((i) => i.cart_item_id));

      setSelectedItems(all);
    }
  };

  const grandTotal = cart.reduce((acc, seller) => {
    return (
      acc +
      seller.items.reduce((sum, item) => {
        if (!selectedItems.includes(item.cart_item_id)) return sum;
        return sum + item.subtotal;
      }, 0)
    );
  }, 0);

  const handleCheckout = () => {
    const checkoutData = cart.flatMap((seller) =>
      seller.items
        .filter((item) => selectedItems.includes(item.cart_item_id))
        .map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image,
          seller_name: seller.seller_name,
          cart_item_id: item.cart_item_id,
        })),
    );
    localStorage.setItem("checkout_data", JSON.stringify(checkoutData));
    router.push("/checkout");
  };

  if (!loading && cart.length === 0) {
    return (
      <BuyerLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-md">
            <div className="mb-6 text-8xl">🛍️</div>

            <h2 className="text-3xl font-bold">Keranjang Masih Kosong</h2>

            <p className="mt-3 text-gray-500">
              Sepertinya kamu belum menambahkan produk apa pun. Yuk jelajahi
              toko dan temukan produk terbaik untukmu.
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <Button
                variant="success"
                onClick={() => router.push("/products")}
              >
                Belanja Sekarang
              </Button>

              <Button variant="secondary" onClick={() => router.push("/")}>
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout>
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="mb-4 flex items-center gap-3">
          <div
            onClick={toggleAll}
            className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border transition ${
              selectAll
                ? "border-green-600 bg-green-600"
                : "border-gray-300 bg-white"
            }`}
          >
            {selectAll && (
              <svg
                className="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-green-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((seller, sIdx) => (
                <div
                  key={seller.seller_id}
                  className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-3 bg-green-200/40 px-4 py-3">
                    <div
                      onClick={() => toggleSeller(sIdx)}
                      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border transition ${
                        selectedSellers.includes(sIdx)
                          ? "border-green-600 bg-green-600"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {selectedSellers.includes(sIdx) && (
                        <svg
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span>🏪 {seller.seller_name}</span>
                  </div>
                  <div className="space-y-2 p-3">
                    {seller.items.map((item) => (
                      <div
                        key={item.cart_item_id}
                        className="flex items-center gap-4 rounded-xl border border-gray-50 bg-white p-4 shadow-sm"
                      >
                        <div
                          onClick={() => toggleItem(item.cart_item_id)}
                          className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border transition ${
                            selectedItems.includes(item.cart_item_id)
                              ? "border-green-600 bg-green-600"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {selectedItems.includes(item.cart_item_id) && (
                            <svg
                              className="h-3 w-3 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        <Image
                          src={
                            item.image
                              ? `${MEDIA_URL}${item.image}`
                              : "/no-image.png"
                          }
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded object-cover"
                          unoptimized
                        />

                        <div className="flex-1">
                          <p>{item.name}</p>

                          <p className="text-sm text-gray-500">
                            {format(item.price)}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateCartItem(
                                    item.cart_item_id,
                                    item.quantity - 1,
                                  );
                                }
                              }}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="min-w-[30px] text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                updateCartItem(
                                  item.cart_item_id,
                                  item.quantity + 1,
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="ml-auto flex min-w-[120px] flex-col items-end">
                          <div className="text-lg font-semibold text-green-600">
                            {format(item.subtotal)}
                          </div>
                          <Button
                            variant="danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => removeItem(item.cart_item_id)}
                          >
                            Hapus
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-xl border border-gray-50 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] lg:sticky lg:top-6">
              <h2 className="mb-2 font-bold">Ringkasan</h2>

              <div className="flex justify-between">
                <span>Total</span>
                <span>{format(grandTotal)}</span>
              </div>

              <Button
                variant="success"
                size="md"
                className="mt-4 w-full"
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout ({selectedItems.length})
              </Button>
            </div>
          </div>
        )}
      </div>
    </BuyerLayout>
  );
}
