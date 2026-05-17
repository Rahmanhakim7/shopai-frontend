"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SellerLayout from "@/layouts/sellerlayouts";
export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("active");
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
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
      const response = await fetch(
        "http://127.0.0.1:8000/api/seller/products/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log("response data", data);
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      alert("Product added successfully");
      router.push("/seller/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SellerLayout title="Add Product">
      <div className="min-h-screen bg-zinc-100 p-6">
        <div className="max-w-5xl mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-zinc-800">
              Tambah Product
            </h1>
          <div className="bg-white rounded-3xl shadow-md p-8">
            <form
              onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nama Product
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Product"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Harga
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Harga"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="sold_out">Sold Out</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Stok
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Stok"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Deskripsi Product
                    </label>
                    <textarea
                      placeholder="Masukkan Deskripsi Product"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 p-6 min-h-[400px]">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full max-w-sm h-80 object-cover rounded-2xl shadow-md"
                        />
                      ) : (
                        <div className="text-center text-zinc-400">
                          <p className="text-lg font-medium">
                            Preview Gambar Product
                          </p>
                          <p className="text-sm mt-2">
                            Upload Gambar Untuk Melihat Preview Di Sini
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Gambar Product
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-zinc-300 rounded-xl px-4 py-3 bg-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      loading={loading}
                      className="w-full"
                    >
                      {loading ? "Adding..." : "Add Product"}
                    </Button>
                  </div>
            </form>
          </div>
        </div>
      </div>
    </SellerLayout>  
  );
}