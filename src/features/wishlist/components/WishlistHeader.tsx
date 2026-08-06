import { Heart, Package2 } from "lucide-react";

type WishlistHeaderProps = {
  totalCount: number;
};

export default function WishlistHeader({ totalCount }: WishlistHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 px-6 py-5 text-white shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <Heart className="h-6 w-6 fill-white text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-sm text-green-100">
            Simpan produk favoritmu untuk dibeli nanti.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
        <Package2 className="h-7 w-7 text-green-100" />
        <div>
          <p className="text-[11px] tracking-wider text-green-100 uppercase">
            Produk
          </p>
          <h2 className="text-xl font-bold">{totalCount}</h2>
        </div>
      </div>
    </div>
  );
}
