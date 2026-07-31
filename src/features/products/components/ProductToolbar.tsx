"use client";
import { Grid3X3, List } from "lucide-react";
import SearchInput from "@/components/ui/SearchInput";
import SortDropdown from "@/components/ui/SortDropdown";
import { PRODUCT_SORT_OPTIONS } from "../constants/sort-options";

type ViewMode = "grid" | "list";
type ProductToolbarProps = {
  search: string;
  ordering: string;
  viewMode: ViewMode;
  onSearchChange: (value: string) => void;
  onOrderingChange: (value: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export default function ProductToolbar({
  search,
  ordering,
  viewMode,
  onSearchChange,
  onOrderingChange,
  onViewModeChange,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SearchInput
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari produk favoritmu..."
      />

      <div className="flex items-center gap-3">
        <SortDropdown
          value={ordering}
          onChange={onOrderingChange}
          options={PRODUCT_SORT_OPTIONS}
        />

        <div className="flex overflow-hidden rounded-xl border">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`rounded-xl p-3 transition-all ${
              viewMode === "grid"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Grid3X3 className="h-5 w-5" />
          </button>

          <button
            onClick={() => onViewModeChange("list")}
            className={`rounded-xl p-3 transition-all ${
              viewMode === "list"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
