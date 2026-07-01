"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import SellerLayout from "@/layouts/sellerlayouts";
import Button from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const fetchProduct = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/seller/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const product = data.data;
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setStatus(product.status);
      if (product.image) {
        setPreview(`${API_URL}${product.image}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      await fetchProduct();
    };
    loadProduct();
  }, [id]);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }
      const response = await fetch(`${API_URL}/api/seller/products/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire({
          title: "Error!",
          text: data.message || "Failed update product",
          icon: "error",
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitting(false);
      await Swal.fire({
        title: "Success!",
        text: "Product updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/seller/products");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SellerLayout sidebarTitle="Edit Product">
      <div className="p-6">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow">
          <h1 className="mb-8 text-3xl font-bold">Edit Product</h1>
          {fetchLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-green-600" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-10 md:grid-cols-2"
            >
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-medium">Product Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium">Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-2xl border px-4 py-3"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="sold_out">Sold Out</option>
                  </select>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-medium">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                </div>
                {preview && (
                  <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border bg-zinc-100">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <Button variant="success" type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    "Update Product"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SellerLayout>
  );
}
