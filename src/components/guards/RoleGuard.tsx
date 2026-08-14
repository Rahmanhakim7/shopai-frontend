"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Role = "seller" | "buyer" | "admin";

type Props = {
  children: React.ReactNode;
  role: Role;
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
          router.replace("/login");
      }
    }
  }, [loading, user, role, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user.role !== role) {
    return null;
  }

  return <>{children}</>;
}
