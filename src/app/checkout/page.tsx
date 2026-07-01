"use client";

import { useEffect, useMemo, useState } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";

type CheckoutItem = {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string | null;
  seller_name: string;
  cart_item_id?: number;
};

const MEDIA_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("checkout_data");
      if (!stored) return [];
      const parsed: CheckoutItem[] = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") return;

    try {
      const stored = localStorage.getItem("checkout_data");
      if (!stored) {
        router.replace("/cart");
        return;
      }
      const parsed: CheckoutItem[] = JSON.parse(stored);
      if (!parsed.length) {
        router.replace("/cart");
        return;
      }
      setCheckoutData(parsed);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("checkout_data");
      router.replace("/product");
    } finally {
      setLoading(false);
    }
  }, [authLoading, user, router]);

  const grandTotal = useMemo(() => {
    return checkoutData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [checkoutData]);

  const totalItems = useMemo(() => {
    return checkoutData.reduce((acc, item) => acc + item.quantity, 0);
  }, [checkoutData]);

  const format = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(n);

  const handleCreateOrder = async () => {
    try {
      setSubmitting(true);
      const items = checkoutData.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));
      await api.post("/orders/create/", {
        items,
      });
      localStorage.removeItem("checkout_data");
      router.replace("/orders");
    } catch (err) {
      console.error("Failed create order:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const groupedItems = useMemo(() => {
    return checkoutData.reduce(
      (acc, item) => {
        if (!acc[item.seller_name]) {
          acc[item.seller_name] = [];
        }
        acc[item.seller_name].push(item);
        return acc;
      },
      {} as Record<string, CheckoutItem[]>,
    );
  }, [checkoutData]);

  if (loading) {
    return (
      <RoleGuard role="buyer">
        <BuyerLayout>
          <div className="flex min-h-[60vh] items-center justify-center">
            <p>Loading...</p>
          </div>
        </BuyerLayout>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="min-h-screen bg-gray-50 px-4 py-6">
          <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {Object.entries(groupedItems).map(([sellerName, items]) => {
                const sellerTotal = items.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                );
                return (
                  <div
                    key={sellerName}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <div className="bg-green-100 px-4 py-3 font-semibold">
                      🏪 {sellerName}
                    </div>
                    <div className="p-4">
                      {items.map((item) => (
                        <div
                          key={`${item.product_id}-${item.cart_item_id ?? "buynow"}`}
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
                            {format(item.price * item.quantity)}
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
    </RoleGuard>
  );
}
