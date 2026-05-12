"use client";
import { useState } from "react";
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data.detail || "Login gagal",
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error",
      };
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
}