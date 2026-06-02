"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SellerLayout from "@/layouts/sellerlayouts";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  image: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SellerProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }
      const response = await fetch(
        `${API_BASE_URL}/seller/products/${params.id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("product detail", data);
      setProduct(data.data);
    } catch (error) {
      console.error(
        "Error fetching product detail:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadProducts =  async () => {
      await fetchProducts();
    }
    loadProducts();
  }, []);
  if (loading) {
    return (
      <SellerLayout title="Product Detail">
        <p>Loading...</p>
      </SellerLayout>
    );
  }
  if (!product) {
    return (
      <SellerLayout title="Product Detail">
        <p>Product not found</p>
      </SellerLayout>
    );
  }
  const imageUrl = product.image?.startsWith("http")? product.image : `${API_URL}${product.image}`;
  return (
    <SellerLayout title="Product Detail">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-800">
              Product Detail
            </h1>
            <p className="text-zinc-500 mt-1">
              Detail information about your product
            </p>
          </div>
          <Link
            href={`/seller/products/${product.id}/edit/`}>
            <Button variant="primary">
              Edit Product
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-zinc-100">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-zinc-500 mb-2">
                Product Name
              </p>
              <h2 className="text-3xl font-bold text-zinc-800">
                {product.name}
              </h2>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-2">
                Price
              </p>
              <h3 className="text-2xl font-semibold text-green-600">
                Rp {product.price}
              </h3>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-2">
                Stock
              </p>
              <p className="text-lg font-medium">
                {product.stock}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-2">
                Status
              </p>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium
                ${
                  product.status === "active"
                    ? "bg-green-100 text-green-600"
                    : product.status === "inactive"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}>
                {product.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-2">
                Description
              </p>
              <p className="text-zinc-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <Link
                href={`/seller/products/${product.id}/edit/`}>
                <Button variant="primary">
                  Edit
                </Button>
              </Link>
              <Link href="/seller/products">
                <Button variant="secondary">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}