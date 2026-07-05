"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface GoogleRoleModalProps {
  open: boolean;
  loading: boolean;
  googleData: {
    credential: string;
    email: string;
    name: string;
    picture: string;
  } | null;
  selectedRole: "buyer" | "seller";
  onRoleChange: (role: "buyer" | "seller") => void;
  onSubmit: () => void;
}
export default function GoogleRoleModal({
  open,
  loading,
  googleData,
  selectedRole,
  onRoleChange,
  onSubmit,
}: GoogleRoleModalProps) {
  if (!open || !googleData) {
    return null;
  }
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center">
          <Image
            src={googleData.picture}
            alt={googleData.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <h2 className="mt-4 text-xl font-bold text-green-600">
            Selamat Datang 👋
          </h2>
          <p className="mt-2 font-semibold">{googleData.name}</p>
          <p className="text-sm text-zinc-500">{googleData.email}</p>
        </div>
        <div className="mt-6">
          <h3 className="mb-3 font-semibold">Pilih Jenis Akun</h3>
          <button
            type="button"
            onClick={() => onRoleChange("buyer")}
            className={`mb-3 w-full rounded-xl border p-4 text-left transition ${
              selectedRole === "buyer"
                ? "border-green-600 bg-green-50"
                : "border-zinc-300"
            }`}
          >
            <p className="font-semibold">🛒 Buyer</p>
            <p className="text-sm text-zinc-500">Belanja produk di ShopAI</p>
          </button>
          <button
            type="button"
            onClick={() => onRoleChange("seller")}
            className={`w-full rounded-xl border p-4 text-left transition ${
              selectedRole === "seller"
                ? "border-green-600 bg-green-50"
                : "border-zinc-300"
            }`}
          >
            <p className="font-semibold">🏪 Seller</p>
            <p className="text-sm text-zinc-500">Jual produk di ShopAI</p>
          </button>
        </div>
        <Button
          type="button"
          variant="success"
          loading={loading}
          className="mt-6 w-full"
          onClick={onSubmit}
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
