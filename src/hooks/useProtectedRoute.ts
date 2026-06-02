"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const useProtectedRoute = () => {
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (loading) return; 

    if (!token) {
      router.push("/login");
    }
  }, [token, loading, router]);
};