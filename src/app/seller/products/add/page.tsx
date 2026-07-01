"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SellerLayout from "@/layouts/sellerlayouts";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState("");
  const [condition, setCondition] = useState("new");
  const [status, setStatus] = useState("active");
  const { user, loading: authLoading } = useAuth();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          title: "Login Required",
          text: "Please login first",
          icon: "warning",
        });
        router.push("/login");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }
      formData.append("condition", condition);
      const response = await fetch(
        "http://127.0.0.1:8000/api/seller/products/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setLoading(false);
      await Swal.fire({
        title: "Success!",
        text: "Product added successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/seller/products");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Failed to add product",
        icon: "error",
      });
    }
  };
  return (
    <RoleGuard role="seller">
      <SellerLayout sidebarTitle="Tambah Produk">
        <div className="min-h-screen bg-zinc-100 p-6">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-8 text-3xl font-bold text-zinc-800">
              Tambah Product
            </h1>
            <div className="rounded-3xl bg-white p-8 shadow-md">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-8 md:grid-cols-2"
              >
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Nama Product
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Product"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Harga
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Harga"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="sold_out">Sold Out</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Kondisi
                    </label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="new"
                          name="condition"
                          checked={condition === "new"}
                          onChange={() => setCondition("new")}
                        />
                        <label htmlFor="new" className="text-sm text-gray-600">
                          Baru
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="used"
                          name="condition"
                          checked={condition === "used"}
                          onChange={() => setCondition("used")}
                        />
                        <label htmlFor="used" className="text-sm text-gray-600">
                          Bekas
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Stok
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Stok"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Deskripsi Product
                    </label>
                    <textarea
                      placeholder="Masukkan Deskripsi Product"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-80 w-full max-w-sm rounded-2xl object-cover shadow-md"
                      />
                    ) : (
                      <div className="text-center text-zinc-400">
                        <p className="text-lg font-medium">
                          Preview Gambar Product
                        </p>
                        <p className="mt-2 text-sm">
                          Upload Gambar Untuk Melihat Preview Di Sini
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Gambar Product
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Adding Product...</span>
                      </div>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </SellerLayout>
    </RoleGuard>
  );
}
