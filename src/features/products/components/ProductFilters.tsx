import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ProductConditionFilter } from "../constants/product-condition";

type ProductFiltersProps = {
  inStock: boolean;
  outOfStock: boolean;
  condition: ProductConditionFilter;

  onToggleInStock: () => void;
  onToggleOutOfStock: () => void;
  onConditionChange: (condition: ProductConditionFilter) => void;
  onReset: () => void;
};

export default function ProductFilters({
  inStock,
  outOfStock,
  condition,
  onToggleInStock,
  onToggleOutOfStock,
  onConditionChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <aside className="hidden h-fit w-72 overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm lg:block">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4">
        <h2 className="text-base font-semibold text-white">Filter Produk</h2>
        <p className="mt-1 text-xs text-green-100">
          Filter produk sesuai kebutuhanmu
        </p>
      </div>

      <div className="space-y-6 p-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Ketersediaan</h3>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-green-50">
            <Input
              type="checkbox"
              variant="checkbox"
              checked={inStock}
              onChange={onToggleInStock}
            />
            <span className="text-sm text-gray-700">Stok Tersedia</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-green-50">
            <Input
              type="checkbox"
              variant="checkbox"
              checked={outOfStock}
              onChange={onToggleOutOfStock}
            />
            <span className="text-sm text-gray-700">Stok Habis</span>
          </label>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h3 className="mb-3 text-sm font-semibold text-gray-800">Kondisi</h3>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-green-50">
            <Input
              type="radio"
              variant="radio"
              checked={condition === "new"}
              onChange={() => onConditionChange("new")}
            />
            <span className="text-sm text-gray-700">Baru</span>
          </label>

          <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-green-50">
            <Input
              type="radio"
              variant="radio"
              checked={condition === "used"}
              onChange={() => onConditionChange("used")}
            />
            <span className="text-sm text-gray-700">Bekas</span>
          </label>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <Button
            variant="success"
            size="sm"
            className="w-full"
            onClick={onReset}
          >
            Reset Filter
          </Button>
        </div>
      </div>
    </aside>
  );
}
