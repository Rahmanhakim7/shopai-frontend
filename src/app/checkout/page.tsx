"use client";

import { useEffect, useMemo, useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

type CartItem = {
  cart_item_id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  subtotal: number;
};

type CheckoutSeller = {
  seller_id: number;
  seller_name: string;
  items: CartItem[];
};

const MEDIA_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState<CheckoutSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("checkout_data");

      if (!stored) {
        router.replace("/cart");
        return;
      }

      const parsed = JSON.parse(stored) as CheckoutSeller[];

      if (!parsed.length) {
        router.replace("/cart");
        return;
      }

      setCheckoutData(parsed);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("checkout_data");
      router.replace("/cart");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const grandTotal = useMemo(() => {
    return checkoutData.reduce((acc, seller) => {
      return (
        acc +
        seller.items.reduce((sum, item) => {
          return sum + item.subtotal;
        }, 0)
      );
    }, 0);
  }, [checkoutData]);

  const totalItems = useMemo(() => {
    return checkoutData.reduce((acc, seller) => {
      return (
        acc +
        seller.items.reduce((sum, item) => {
          return sum + item.quantity;
        }, 0)
      );
    }, 0);
  }, [checkoutData]);

  const format = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(n);

  const handleCreateOrder = async () => {
    try {
      setSubmitting(true);

      const cartItemIds = checkoutData.flatMap((seller) =>
        seller.items.map((item) => item.cart_item_id),
      );

      const res = await api.post("/orders/create/", {
        cart_item_ids: cartItemIds,
      });

      localStorage.removeItem("checkout_data");

      router.replace("/orders/");
    } catch (err) {
      console.error("Failed create order:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <BuyerLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p>Loading...</p>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout>
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {checkoutData.map((seller) => {
              const sellerTotal = seller.items.reduce(
                (acc, item) => acc + item.subtotal,
                0,
              );

              return (
                <div
                  key={seller.seller_id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="bg-green-100 px-4 py-3 font-semibold">
                    🏪 {seller.seller_name}
                  </div>

                  <div className="p-4">
                    {seller.items.map((item) => (
                      <div
                        key={item.cart_item_id}
                        className="flex items-center gap-4 border-b py-4 last:border-0"
                      >
                        <Image
                          src={
                            item.image
                              ? `${MEDIA_URL}${item.image}`
                              : "/no-image.png"
                          }
                          alt={item.name}
                          width={70}
                          height={70}
                          className="rounded-lg object-cover"
                          unoptimized
                        />

                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>

                          <p className="text-sm text-gray-500">
                            {format(item.price)}
                          </p>

                          <p className="mt-1 text-sm">Qty: {item.quantity}</p>
                        </div>

                        <div className="font-semibold text-green-600">
                          {format(item.subtotal)}
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
                      <span>Subtotal Seller</span>
                      <span>{format(sellerTotal)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-fit rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="mb-4 text-lg font-bold">Ringkasan Pesanan</h2>

            <div className="mb-2 flex justify-between">
              <span>Total Item</span>
              <span>{totalItems}</span>
            </div>

            <div className="mb-4 flex justify-between">
              <span>Total Belanja</span>
              <span className="font-semibold">{format(grandTotal)}</span>
            </div>

            <div className="border-t pt-4">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total Bayar</span>
                <span className="text-green-600">{format(grandTotal)}</span>
              </div>

              <Button
                variant="success"
                className="w-full"
                onClick={handleCreateOrder}
                disabled={submitting}
              >
                {submitting ? "Memproses..." : "Buat Pesanan"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}
