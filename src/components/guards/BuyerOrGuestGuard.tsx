"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function BuyerOrGuestGuard({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      return;
    }

    if (user.role === "buyer") {
      return;
    }

    if (user.role === "seller") {
      router.replace("/seller/dashboard");
      return;
    }
    if (user.role === "admin") {
      router.replace("/admin/dashboard");
      return;
    }

    router.replace("/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
      </div>
    );
  }

  // Guest → boleh render
  if (!user) {
    return <>{children}</>;
  }

  // Buyer → boleh render
  if (user.role === "buyer") {
    return <>{children}</>;
  }

  // Seller / admin → tunggu redirect
  return null;
}
