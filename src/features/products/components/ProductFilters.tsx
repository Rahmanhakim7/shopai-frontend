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
    <aside className="hidden h-fit w-72 space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:block">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Filter Produk</h2>
        <p className="mt-1 text-xs text-gray-500">
          Filter produk sesuai kebutuhanmu
        </p>
      </div>
      <div className="space-y-3 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-800">Ketersediaan</h3>
        <div className="flex items-center gap-2 leading-none">
          <Input
            type="checkbox"
            variant="checkbox"
            checked={inStock}
            onChange={onToggleInStock}
          />
          <span className="text-sm text-gray-600">Stok Tersedia</span>
        </div>
        <div className="flex items-center gap-2 leading-none">
          <Input
            type="checkbox"
            variant="checkbox"
            checked={outOfStock}
            onChange={onToggleOutOfStock}
          />
          <span className="text-sm text-gray-600">Stok Habis</span>
        </div>
      </div>
      <div className="space-y-3 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-800">Kondisi</h3>
        <div className="flex items-center gap-2 leading-none">
          <Input
            type="radio"
            variant="radio"
            checked={condition === "new"}
            onChange={() => onConditionChange("new")}
          />
          <span className="text-sm text-gray-600">Baru</span>
        </div>
        <div className="flex items-center gap-2 leading-none">
          <Input
            type="radio"
            variant="radio"
            checked={condition === "used"}
            onChange={() => onConditionChange("used")}
          />
          <span className="text-sm text-gray-600">Bekas</span>
        </div>
      </div>
      <div className="border-t pt-4">
        <Button
          variant="success"
          size="sm"
          className="w-full"
          onClick={onReset}
        >
          Reset Filter
        </Button>
      </div>
    </aside>
  );
}
