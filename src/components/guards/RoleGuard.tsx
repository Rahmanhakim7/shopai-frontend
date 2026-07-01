"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
  role: "seller" | "buyer" | "admin";
};

export default function RoleGuard({ children, role }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== role) {
      switch (user.role) {
        case "seller":
          router.replace("/seller/dashboard");
          break;
        case "buyer":
          router.replace("/products");
          break;
        case "admin":
          router.replace("/admin/dashboard");
          break;
        default:
          router.replace("/");
      }
    }
  }, [loading, user, role, router]);
  if (loading) {
    return null;
  }
  if (!user) {
    return null;
  }
  if (user.role !== role) {
    return null;
  }
  return <>{children}</>;
}
