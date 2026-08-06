"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import BuyerLayout from "@/layouts/buyerlayouts";
import RoleGuard from "@/components/guards/RoleGuard";
import useWishlist from "@/features/wishlist/hooks/useWishlist";
import Loader from "@/components/ui/Loader";
import { HeartOff } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import WishlistCard from "@/features/wishlist/components/WishlistCard";
import WishlistHeader from "@/features/wishlist/components/WishlistHeader";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, loading, removeWishlist, page, setPage, totalCount } =
    useWishlist();
  const totalPages = Math.ceil(totalCount / 8);
  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="mx-auto max-w-7xl p-6">
          <WishlistHeader totalCount={totalCount} />
          {loading ? (
            <Loader text="Memuat Wishlist..." className="py-20" />
          ) : wishlist.length === 0 ? (
            <EmptyState
              icon={<HeartOff size={36} />}
              title="Wishlist masih kosong"
              description={
                <>
                  Simpan produk favoritmu ke wishlist agar lebih mudah
                  <br />
                  ditemukan saat ingin membelinya nanti.
                </>
              }
              action={
                <Button
                  variant="success"
                  onClick={() => router.push("/products")}
                >
                  Mulai Belanja
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {wishlist.map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    onRemove={removeWishlist}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
