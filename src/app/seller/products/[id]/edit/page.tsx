"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import SellerLayout from "@/layouts/sellerlayouts";
import {
  getSellerProductDetail,
  updateSellerProduct,
} from "@/features/products/product.api";
import Button from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";

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
      const data = await getSellerProductDetail(id);
      const product = data.data;
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }
      await updateSellerProduct(id, formData);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await Swal.fire({
        title: "Success!",
        text: "Product updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/seller/products");
    } catch (error) {
      console.error(error);
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
        <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="mb-2 border-zinc-200 pb-5">
            <h1 className="text-3xl font-bold text-zinc-800">Edit Produk</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Perbarui informasi produk di tokomu.
            </p>
          </div>
          {fetchLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-green-600" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-10 md:grid-cols-2"
            >
              <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div>
                  <Input
                    label="Nama Produk"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Textarea
                    label="Deskripsi Produk"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Masukkan Deskripsi Product ....."
                  />
                </div>
                <div>
                  <Input
                    label="Harga Produk"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Input
                    label="Stok Produk"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>
                <div>
                  <Select
                    label="Status Produk"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
                      { label: "Active", value: "active" },
                      { label: "Inactive", value: "inactive" },
                      { label: "Sold Out", value: "sold_out" },
                    ]}
                  />
                </div>
              </div>
              <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div>
                  <Input
                    label="Product Image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {preview && (
                  <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-zinc-100">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <Button
                  variant="success"
                  type="submit"
                  disabled={submitting}
                  className="w-full"
                >
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
