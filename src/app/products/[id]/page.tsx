"use client";
import { useParams } from "next/navigation";
import RoleGuard from "@/components/guards/RoleGuard";
import BuyerLayout from "@/layouts/buyerlayouts";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/features/products/hooks/useProductDetail";
import { getImageUrl } from "@/utils/image";
import { getAverageRating } from "@/features/products/utils/averageRating";
import { addToCart } from "@/features/cart/cart.api";
import {
  createCheckoutItem,
  saveCheckoutData,
} from "@/features/orders/utils/checkout";
import { MessageSquareText, Star } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import ProductReviewCard from "@/features/products/components/ProductReviewCard";
import EmptyState from "@/components/ui/EmptyState";
import ProductDetailInfo from "@/features/products/components/ProductDetailInfo";
import ProductGallery from "@/features/products/components/ProductGallery";
import Loader from "@/components/ui/Loader";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { product, reviews, error, currentPage, totalPages, fetchReviews, loading } =
    useProductDetail(Number(id));
  const imageUrl = getImageUrl(product?.image);
  const averageRating = getAverageRating(reviews);

  const handleBuyNow = () => {
    if (!product) return;
    if (product.stock <= 0) {
      alert("Stok produk habis");
      return;
    }
    saveCheckoutData([createCheckoutItem(product)]);
    router.push("/checkout");
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

  if (loading) {
    return (
      <RoleGuard role="buyer">
        <BuyerLayout>
          <Loader text="Memuat detail produk..." fullScreen />
        </BuyerLayout>
      </RoleGuard>
    );
  }
  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="mx-auto max-w-6xl p-6">
          {error && (
            <div className="flex min-h-[60vh] items-center justify-center text-center text-red-500">
              {error}
            </div>
          )}
          {product && (
            <div>
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
                <ProductGallery
                  imageUrl={imageUrl}
                  productName={product.name}
                />
                <ProductDetailInfo
                  product={product}
                  averageRating={Number(averageRating)}
                  reviewCount={reviews.length}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onBack={() => router.push("/products")}
                />
              </div>
              <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Ulasan Pembeli
                      </h2>
                    </div>
                    <p className="mt-2 text-gray-500">
                      Lihat pengalaman pembeli yang telah membeli produk ini.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 px-6 py-5 text-center text-white shadow-lg">
                    <div className="mb-2 flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="h-4 w-4 fill-white text-white"
                        />
                      ))}
                    </div>
                    <p className="text-4xl font-black">{averageRating}</p>
                    <p className="mt-1 text-sm text-gray-600">
                      dari {reviews.length} ulasan
                    </p>
                  </div>
                </div>
                {reviews.length === 0 ? (
                  <EmptyState
                    icon={<MessageSquareText className="h-8 w-8" />}
                    title="Belum Ada Ulasan"
                    description={
                      <>
                        Jadilah pembeli pertama yang memberikan ulasan
                        <br />
                        untuk produk ini.
                      </>
                    }
                  />
                ) : (
                  <>
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                      {reviews.map((review) => (
                        <ProductReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={fetchReviews}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
