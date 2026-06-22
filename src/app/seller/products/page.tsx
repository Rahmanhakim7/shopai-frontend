"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SellerLayout from "@/layouts/sellerlayouts";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Input from "@/components/ui/Input";
import { ArrowUp, ArrowDown, ArrowUpDown, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import Pagination from "@/components/ui/Pagination";
import { ProductItem } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SellerProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const currentPage = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  const status = searchParams.get("status") || "";
  const ordering = searchParams.get("ordering") || "";

  const updateQueryParams = (
    page: number,
    searchValue: string,
    statusValue: string,
    orderingValue: string,
  ) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (searchValue) {
      params.set("search", searchValue);
    }
    if (statusValue) {
      params.set("status", statusValue);
    }
    if (orderingValue) {
      params.set("ordering", orderingValue);
    }
    router.push(`/seller/products?${params.toString()}`);
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }
      const response = await fetch(
        `${API_BASE_URL}/seller/products/?page=${currentPage}&search=${search}&status=${status}&ordering=${ordering}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts(data.results.data);
      setTotalProducts(data.count);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };
    loadProducts();
  }, [searchParams]);

  useEffect(() => {
    const loadSearchInput = async () => {
      await setSearchInput(search);
    };
    loadSearchInput();
  }, [search]);

  useEffect(() => {
    if (searchInput === search) return;
    const delayDebounce = setTimeout(() => {
      updateQueryParams(1, searchInput, status, ordering);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchInput, search]);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "Product yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/seller/products/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      await Swal.fire({
        title: "Deleted!",
        text: "Product berhasil dihapus",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchProducts();
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete product",
        icon: "error",
      });
    }
  };

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const handlePageChange = (page: number) => {
    updateQueryParams(page, searchInput, status, ordering);
  };
  return (
    <SellerLayout sidebarTitle="Product">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
            Products
          </h1>
        </div>
        <Link href="/seller/products/add">
          <Button variant="success">+ Add Product</Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg shadow-green-100/30">
        <div className="flex flex-col">
          <div className="m-4 rounded-3xl border border-green-100 bg-gradient-to-r from-green-50 via-white to-emerald-50 p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <Input
                label="Search Product"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                containerClassName="md:w-96"
              />

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-zinc-600">
                  Filter Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    updateQueryParams(1, searchInput, e.target.value, ordering)
                  }
                  className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-zinc-700 shadow-sm transition-all outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 md:w-56"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="soldout">Sold Out</option>
                </select>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-green-600" />
              <p className="mt-3 text-sm text-zinc-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 text-5xl">📦</div>
              <h3 className="text-xl font-bold text-zinc-700">
                No products found
              </h3>
              <p className="mt-2 text-zinc-500">
                Try changing your search or add a new product.
              </p>
              <Link href="/seller/products/add" className="mt-6">
                <Button variant="success">Add Product</Button>
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                <tr className="text-left text-zinc-600">
                  <th className="px-6 py-4">Product</th>
                  <th>
                    <div
                      className="flex cursor-pointer items-center gap-2 transition hover:text-green-600"
                      onClick={() => {
                        const nextOrdering =
                          ordering === "price" ? "-price" : "price";
                        updateQueryParams(1, searchInput, status, nextOrdering);
                      }}
                    >
                      <span>Price</span>
                      {ordering === "price" && <ArrowDown size={16} />}
                      {ordering === "-price" && <ArrowUp size={16} />}
                      {ordering !== "-price" && ordering !== "price" && (
                        <ArrowUpDown size={16} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div
                      className="flex cursor-pointer items-center gap-2 transition hover:text-green-600"
                      onClick={() => {
                        const nextOrdering =
                          ordering === "stock" ? "-stock" : "stock";
                        updateQueryParams(1, searchInput, status, nextOrdering);
                      }}
                    >
                      <span>Stock</span>
                      {ordering === "stock" && <ArrowDown size={16} />}
                      {ordering === "-stock" && <ArrowUp size={16} />}
                      {ordering !== "stock" && ordering !== "-stock" && (
                        <ArrowUpDown size={16} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4">Condition</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const imageUrl = product.image?.startsWith("http")
                    ? product.image
                    : `${API_URL}${product.image}`;
                  return (
                    <tr
                      key={product.id}
                      className="border-b border-green-50 transition-all duration-200 hover:bg-green-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
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
                            <p className="text-xs text-zinc-400">
                              ID #{product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold text-green-700">
                        Rp {product.price.toLocaleString("id-ID")}
                      </td>
                      <td>
                        <span
                          className={`rounded-lg px-3 py-1 font-medium ${
                            product.stock <= 5
                              ? "bg-red-100 text-red-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.condition === "new"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {product.condition === "new" ? "Baru" : "Bekas"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.status === "active"
                              ? "bg-green-100 text-green-700"
                              : product.status === "inactive"
                                ? "bg-zinc-100 text-zinc-600"
                                : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link href={`/seller/products/${product.id}`}>
                            <Button variant="secondary" size="sm">
                              Detail
                            </Button>
                          </Link>
                          <Link href={`/seller/products/${product.id}/edit/`}>
                            <Button variant="primary" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="border-t border-green-100 px-6 py-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-zinc-500">
                Total Products:
                <span className="ml-1 font-semibold text-green-700">
                  {totalProducts}
                </span>
              </p>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
