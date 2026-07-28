import { showConfirm, showError, showSuccess } from "@/utils/alert";

type FetchProductsParams = {
  page: number;
  search?: string;
  status?: string;
  ordering?: string;
};

type UseSellerProductActionsProps = {
  deleteProduct: (id: number) => Promise<void>;
  fetchProducts: (params: FetchProductsParams) => Promise<void>;

  currentPage: number;
  search: string;
  status: string;
  ordering: string;
};

export function useSellerProductActions({
  deleteProduct,
  fetchProducts,
  currentPage,
  search,
  status,
  ordering,
}: UseSellerProductActionsProps) {
  const handleDelete = async (id: number) => {
    const result = await showConfirm(
      "Hapus Produk?",
      "Produk yang dihapus tidak dapat dikembalikan.",
    );

    if (!result.isConfirmed) return;

    try {
      await deleteProduct(id);
      await showSuccess("Produk berhasil dihapus.");
      await fetchProducts({
        page: currentPage,
        search,
        status,
        ordering,
      });
    } catch (error) {
      console.error(error);
      showError("Gagal menghapus produk.");
    }
  };
  return {
    handleDelete,
  };
}
