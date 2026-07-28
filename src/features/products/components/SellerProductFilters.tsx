"use client";
import Input from "@/components/ui/Input";

type SellerProductFiltersProps = {
  searchInput: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export default function SellerProductFilters({
  searchInput,
  status,
  onSearchChange,
  onStatusChange,
}: SellerProductFiltersProps) {
  return (
    <div className="m-4 rounded-3xl border border-green-100 bg-gradient-to-r from-green-50 via-white to-emerald-50 p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <Input
          label="Cari Produk"
          placeholder="Cari Produk..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          containerClassName="md:w-96"
        />

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-zinc-600">
            Filter Status
          </label>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-zinc-700 shadow-sm transition-all outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 md:w-56"
          >
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
            <option value="soldout">Stok Habis</option>
          </select>
        </div>
      </div>
    </div>
  );
}
