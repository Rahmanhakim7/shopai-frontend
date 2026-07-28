import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { Product } from "@/types/product";
import { getImageUrl } from "@/utils/image";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductConditionBadge from "./ProductConditionBadge";
import ProductStockBadge from "./ProductStockBadge";

type ProductTableProps = {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  ordering: string;
  searchInput: string;
  status: string;

  onDelete: (id: number) => void;
  onPageChange: (page: number) => void;

  updateQueryParams: (
    page: number,
    search: string,
    status: string,
    ordering: string,
  ) => void;
};

export default function ProductTable({
  products,
  totalProducts,
  currentPage,
  totalPages,
  ordering,
  searchInput,
  status,
  onDelete,
  onPageChange,
  updateQueryParams,
}: ProductTableProps) {
  return (
    <>
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
          <tr className="text-left text-zinc-600">
            <th className="px-6 py-4">Produk</th>

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
                {ordering !== "price" && ordering !== "-price" && (
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

            <th className="px-6 py-4">Kondisi</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-green-50 transition-all duration-200 hover:bg-green-50/50"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
                    <Image
                      src={getImageUrl(product.image)}
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

                    <p className="text-xs text-zinc-400">ID #{product.id}</p>
                  </div>
                </div>
              </td>

              <td className="font-semibold text-green-700">
                Rp {product.price.toLocaleString("id-ID")}
              </td>

              <td>
                <ProductStockBadge stock={product.stock} />
              </td>

              <td className="px-6 py-4">
                <ProductConditionBadge condition={product.condition} />
              </td>

              <td className="px-6 py-4">
                <ProductStatusBadge status={product.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Link href={`/seller/products/${product.id}`}>
                    <Button variant="secondary" size="sm">
                      Detail
                    </Button>
                  </Link>

                  <Link href={`/seller/products/${product.id}/edit`}>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}
