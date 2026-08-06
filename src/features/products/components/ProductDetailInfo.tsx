import { FileText, Star, Store } from "lucide-react";

import { Product } from "../types/product";
import StockBadge from "./ProductStockBadge";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductConditionBadge from "./ProductConditionBadge";
import ProductDetailActions from "./ProductDetailActions";

type ProductDetailInfoProps = {
  product: Product;
  averageRating: number;
  reviewCount: number;
  onAddToCart: React.MouseEventHandler<HTMLButtonElement>;
  onBuyNow: () => void;
  onBack: () => void;
};

export default function ProductDetailInfo({
  product,
  averageRating,
  reviewCount,
  onAddToCart,
  onBuyNow,
  onBack,
}: ProductDetailInfoProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900">
        {product.name}
      </h1>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

          <span className="font-semibold text-gray-800">{averageRating}</span>

          <span className="text-gray-500">({reviewCount} ulasan)</span>
        </div>

        <div className="flex flex-wrap gap-3 [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:-translate-y-1 [&>*]:hover:scale-105">
          <StockBadge stock={product.stock} />
          <ProductStatusBadge status={product.status} />
          <ProductConditionBadge condition={product.condition} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex h-full flex-col justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-center text-2xl font-black text-white">
            Rp {product.price.toLocaleString()}
          </h2>
        </div>

        <div className="flex h-full flex-col justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
              <Store className="h-7 w-7 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {product.seller_name}
              </h3>

              <p className="text-sm text-green-600">Seller Terpercaya</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
            <FileText className="h-6 w-6 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Deskripsi Produk
            </h2>

            <p className="text-sm text-gray-500">
              Informasi lengkap mengenai produk
            </p>
          </div>
        </div>

        <p className="flex-1 leading-8 whitespace-pre-line text-gray-600">
          {product.description}
        </p>
      </div>

      <ProductDetailActions
        stock={product.stock}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onBack={onBack}
      />
    </div>
  );
}
