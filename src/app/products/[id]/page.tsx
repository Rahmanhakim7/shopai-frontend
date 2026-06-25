"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Image from "next/image";
import Button from "@/components/ui/Button";
import BuyerLayout from "@/layouts/buyerlayouts";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  image?: string;
  seller_name?: string;
};

type CheckoutItem = {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string | null;
  seller_name: string;
};

type Review = {
  id: number;
  buyer_username: string;
  rating: number;
  comment: string;
  created_at: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const startTime = Date.now();
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}/`);
        setProduct(response.data.data);
        const reviewResponse = await api.get(`/reviews/product/${id}/`);
        setReviews(reviewResponse.data);
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        const elapsed = Date.now() - startTime;
        const minimumLoadingTime = 800;
        if (elapsed < minimumLoadingTime) {
          setTimeout(() => {
            setLoading(false);
          }, minimumLoadingTime - elapsed);
        } else {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_URL}${product.image}`
    : null;
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  const handleBuyNow = () => {
    if (!product) return;
    if (product.stock <= 0) {
      alert("Stok produk habis");
      return;
    }
    const checkoutData: CheckoutItem[] = [
      {
        product_id: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.image || null,
        seller_name: product.seller_name || "",
      },
    ];
    localStorage.setItem("checkout_data", JSON.stringify(checkoutData));
    router.push("/checkout");
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    try {
      await api.post("/cart/add/", {
        product_id: product.id,
        quantity: 1,
      });
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

  return (
    <BuyerLayout>
      <div className="mx-auto max-w-6xl p-6">
        {loading && (
          <div className="grid animate-pulse gap-8 md:grid-cols-2">
            <div className="h-[450px] rounded-3xl bg-gray-200"></div>
            <div>
              <div className="h-10 w-3/4 rounded bg-gray-200"></div>
              <div className="mt-4 h-8 w-40 rounded bg-gray-200"></div>
              <div className="mt-6 space-y-3">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
              <div className="mt-8 h-12 rounded-xl bg-gray-200"></div>
            </div>
          </div>
        )}
        {!loading && error && (
          <div className="flex min-h-[60vh] items-center justify-center text-center text-red-500">
            {error}
          </div>
        )}
        {!loading && product && (
          <div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm ring-1 ring-black/5">
                <div className="relative h-[450px]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {product.name}
                    </h1>
                  </div>

                  <div className="rounded-2xl bg-green-50 px-4 py-2">
                    <span className="text-sm font-medium text-green-700">
                      🏪 {product.seller_name}
                    </span>
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <p className="text-3xl font-bold text-green-600">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.status === "active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
                <div className="mt-8 border-t pt-6">
                  <h2 className="mb-3 text-lg font-semibold text-gray-900">
                    Deskripsi Produk
                  </h2>
                  <p className="leading-relaxed whitespace-pre-line text-gray-600">
                    {product.description}
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="success"
                    size="sm"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    + Cart
                  </Button>
                  <button
                    disabled={product.stock <= 0}
                    className={`flex-1 rounded-xl py-3 font-medium text-white ${
                      product.stock <= 0
                        ? "cursor-not-allowed bg-gray-400"
                        : "cursor-pointer bg-blue-600 hover:bg-blue-700"
                    } `}
                    onClick={handleBuyNow}
                  >
                    Beli Sekarang
                  </button>
                  <button
                    className="cursor-pointer rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                    onClick={() => router.push("/products")}
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Ulasan Pembeli</h2>

                  <p className="mt-1 text-sm text-gray-500">
                    ⭐ {averageRating} • {reviews.length} ulasan
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-center text-gray-400">Belum ada ulasan</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border p-4">
                      <div className="flex justify-between">
                        <p className="font-semibold">{review.buyer_username}</p>
                        <span>{"⭐".repeat(review.rating)}</span>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </BuyerLayout>
  );
}
