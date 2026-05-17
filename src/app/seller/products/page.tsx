"use client"
import  { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import SellerLayout from '@/layouts/sellerlayouts';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
  image: string;  
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SellerProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
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
        `${API_BASE_URL}/seller/products/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log('products data', data);
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const loadProducts =  async () => {
      await fetchProducts();
    }
    loadProducts();
  }, []);
    const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/seller/products/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };
  return (
    <SellerLayout title="Products">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-800">
            Products
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage your products easily
          </p>
        </div>
        <Link href="/seller/products/add">
          <Button variant="success">
            + Add Product
          </Button>
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50">
                <tr className="text-left text-zinc-600">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const imageUrl =
                    product.image?.startsWith("http")
                      ? product.image
                      : `${API_URL}${product.image}`;
                  return (
                    <tr
                      key={product.id}
                      className="border-t hover:bg-zinc-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-100">
                            <Image
                              src={imageUrl}
                              alt={product.name}
                              width={80}
                              height={80}
                              unoptimized
                            />
                          </div>
                          <div>
                            <h2 className="font-semibold text-zinc-800">
                              {product.name}
                            </h2>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4">
                        {product.status}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/seller/products/${product.id}`}>
                            <Button variant="secondary" size="sm">
                              Detail
                            </Button>
                          </Link>
                          <Link
                            href={`/seller/products/edit/${product.id}`}>
                            <Button variant="primary" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(product.id)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </SellerLayout>
  )
}