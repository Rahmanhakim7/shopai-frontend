"use client";
import { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import type { ProductFormValues } from "@/features/products/types/product";

type ProductFormProps = {
  values: ProductFormValues;
  preview: string | null;
  loading: boolean;
  submitLabel: string;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function ProductForm({
  values,
  preview,
  loading,
  submitLabel,
  onChange,
  onImageChange,
  onSubmit,
}: ProductFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2"
    >
      <div className="flex h-full flex-col space-y-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <Input
          label="Nama Produk"
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Masukkan nama produk"
        />
        <Textarea
          label="Deskripsi Produk"
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
          placeholder="Masukkan deskripsi produk"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Harga"
            type="number"
            value={values.price}
            onChange={(e) => onChange("price", e.target.value)}
            placeholder="0"
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              Kondisi
            </label>

            <div className="flex gap-3">
              <label
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  values.condition === "new"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-zinc-300 hover:border-green-400"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={values.condition === "new"}
                  onChange={() => onChange("condition", "new")}
                />
                Baru
              </label>

              <label
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  values.condition === "used"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-zinc-300 hover:border-green-400"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={values.condition === "used"}
                  onChange={() => onChange("condition", "used")}
                />
                Bekas
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Stok"
            type="number"
            value={values.stock}
            onChange={(e) => onChange("stock", e.target.value)}
            placeholder="0"
          />

          <Select
            label="Status"
            value={values.status}
            onChange={(e) => onChange("status", e.target.value)}
            options={[
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
              { label: "Stok Habis", value: "sold_out" },
            ]}
          />
        </div>
      </div>
      <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="relative flex-1 overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-zinc-400">
                <p className="text-base font-medium">Preview Gambar Produk</p>

                <p className="mt-2 text-sm">
                  Upload gambar untuk melihat preview
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 space-y-4">
          <Input
            label="Gambar Produk"
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
          <Button
            type="submit"
            variant="success"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
