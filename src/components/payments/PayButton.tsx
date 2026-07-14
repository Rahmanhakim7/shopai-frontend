"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { createPayment, getOrder } from "@/features/payments/payment.api";
import { openMidtransSnap } from "@/features/payments/midtrans";

interface Props {
  orderId: number;
  onPaymentSuccess: () => Promise<void>;
  className?: string;
}

export default function PayButton({
  orderId,
  onPaymentSuccess,
  className,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const waitUntilPaid = async () => {
    for (let i = 0; i < 15; i++) {
      const order = await getOrder(orderId);
      if (order.payment_status === "paid") {
        await onPaymentSuccess();
        return true;
      }
      await delay(1000);
    }
    return false;
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const payment = await createPayment(orderId);
      openMidtransSnap(payment.snap_token, {
        onSuccess: async () => {
          const success = await waitUntilPaid();
          if (!success) {
            alert(
              "Status pembayaran belum diperbarui. Silakan refresh halaman beberapa saat lagi.",
            );
          }
          setLoading(false);
        },
        onPending: () => {
          setLoading(false);
          router.refresh();
        },
        onError: () => {
          setLoading(false);
          alert("Pembayaran gagal.");
        },
        onClose: () => {
          setLoading(false);
          alert("Pembayaran dibatalkan.");
        },
      });
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat membuat pembayaran.");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className={className ?? "w-full"}
    >
      {loading ? "Memproses..." : "Bayar Sekarang"}
    </Button>
  );
}
