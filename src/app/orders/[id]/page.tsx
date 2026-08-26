"use client";

import BuyerLayout from "@/layouts/buyerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import Script from "next/script";
import { Package } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import Loader from "@/components/ui/Loader";
import OrderDetailContent from "@/features/orders/components/OrderDetailContent";
import ReviewModal from "@/features/orders/components/ReviewModal";
import { useOrderDetail } from "@/features/orders/hooks/useOrderDetail";

export default function OrderDetailPage() {
  const {
    order,
    loading,
    selectedItem,
    rating,
    comment,
    submitting,
    completingId,
    setRating,
    setComment,
    setSelectedItem,
    handleSubmitReview,
    handleCompleteSellerOrder,
    handleCancelOrder,
    fetchOrder,
  } = useOrderDetail();

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />

        <div className="min-h-screen bg-gray-50 p-6">
          {loading ? (
            <div className="flex min-h-[60vh] items-center justify-center">
              <Loader text="Memuat detail pesanan..." size="md" />
            </div>
          ) : !order ? (
            <EmptyState
              icon={<Package className="h-7 w-7" />}
              title="Pesanan tidak ditemukan"
              description="Pesanan yang kamu cari tidak tersedia atau sudah tidak dapat diakses."
            />
          ) : (
            <OrderDetailContent
              order={order}
              completingId={completingId}
              onComplete={handleCompleteSellerOrder}
              onCancel={handleCancelOrder}
              onPaymentSuccess={fetchOrder}
              onReview={(item) => {
                setRating(0);
                setComment("");
                setSelectedItem(item);
              }}
            />
          )}
        </div>

        <ReviewModal
          item={selectedItem}
          rating={rating}
          comment={comment}
          submitting={submitting}
          setRating={setRating}
          setComment={setComment}
          onClose={() => setSelectedItem(null)}
          onSubmit={handleSubmitReview}
        />
      </BuyerLayout>
    </RoleGuard>
  );
}
