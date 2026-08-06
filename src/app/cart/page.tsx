"use client";
import { useEffect } from "react";
import BuyerLayout from "@/layouts/buyerlayouts";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/features/cart/hooks/useCart";
import { formatCurrency } from "@/utils/currency";
import CartSellerCard from "@/features/cart/components/CartSellerCard";
import SelectionCheckbox from "@/features/cart/components/SelectionCheckbox";
import { useCartSelection } from "@/features/cart/hooks/useCartSelection";
import EmptyState from "@/components/ui/EmptyState";
import { ShoppingCart, ReceiptText, CreditCard } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { cart, loading, fetchCart, updateItem, removeItem } = useCart();
  const {
    selectedItems,
    setSelectedItems,
    selectAll,
    selectedSellers,
    grandTotal,
    toggleItem,
    toggleSeller,
    toggleAll,
  } = useCartSelection(cart);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "buyer") return;
    const loadCart = async () => {
      await fetchCart();
    };
    loadCart();
  }, [authLoading, user]);

  const handleCheckout = () => {
    const checkoutData = cart.flatMap((seller) =>
      seller.items
        .filter((item) => selectedItems.includes(item.cart_item_id))
        .map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image,
          seller_name: seller.seller_name,
          cart_item_id: item.cart_item_id,
        })),
    );
    localStorage.setItem("checkout_data", JSON.stringify(checkoutData));
    router.push("/checkout");
  };

  if (!loading && cart.length === 0) {
    return (
      <RoleGuard role="buyer">
        <BuyerLayout>
          <div className="flex min-h-[70vh] items-center justify-center">
            <EmptyState
              icon={
                <div className="rounded-full bg-green-100 p-5">
                  <ShoppingCart className="h-14 w-14 text-green-600" />
                </div>
              }
              title="Keranjang Masih Kosong"
              description={
                <>
                  Sepertinya kamu belum menambahkan produk apa pun.
                  <br />
                  Yuk jelajahi toko dan temukan produk terbaik untukmu.
                </>
              }
              action={
                <div className="flex justify-center gap-3">
                  <Button
                    variant="success"
                    onClick={() => router.push("/products")}
                  >
                    Belanja Sekarang
                  </Button>
                  <Button variant="secondary" onClick={() => router.push("/")}>
                    Kembali ke Beranda
                  </Button>
                </div>
              }
            />
          </div>
        </BuyerLayout>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard role="buyer">
      <BuyerLayout>
        <div className="min-h-screen bg-gray-50 px-4 py-6">
          <div className="mb-4 flex items-center gap-3">
            <SelectionCheckbox checked={selectAll} onClick={toggleAll} />
            <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader text="Memuat keranjang..." className="py-20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {cart.map((seller, sIdx) => (
                  <CartSellerCard
                    key={seller.seller_id}
                    seller={seller}
                    sellerIndex={sIdx}
                    selectedItems={selectedItems}
                    selectedSellers={selectedSellers}
                    onToggleSeller={toggleSeller}
                    onToggleItem={toggleItem}
                    onDecrease={(id, quantity) => {
                      if (quantity > 1) {
                        updateItem(id, quantity - 1);
                      }
                    }}
                    onIncrease={(id, quantity) => {
                      updateItem(id, quantity + 1);
                    }}
                    onRemove={async (id) => {
                      await removeItem(id);
                      setSelectedItems((prev) =>
                        prev.filter((itemId) => itemId !== id),
                      );
                    }}
                  />
                ))}
              </div>

              <div className="h-fit rounded-xl border border-gray-50 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] lg:sticky lg:top-6">
                <div className="mb-4 flex items-center gap-2">
                  <ReceiptText className="h-5 w-5 text-green-600" />
                  <h2 className="font-bold">Ringkasan Belanja</h2>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>

                <Button
                  variant="success"
                  size="md"
                  className="mt-4 w-full"
                  disabled={selectedItems.length === 0}
                  onClick={handleCheckout}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout ({selectedItems.length})
                </Button>
              </div>
            </div>
          )}
        </div>
      </BuyerLayout>
    </RoleGuard>
  );
}
