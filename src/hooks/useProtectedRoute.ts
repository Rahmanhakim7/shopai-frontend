import { useEffect } from "react";
import { useRouter } from "next/navigation"

export const useProtectedRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      router.push("/login");
    }
  }, []);
};