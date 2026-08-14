"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { AuthContextType, UserProfile } from "@/types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        // Tidak ada token = guest
        if (!savedToken) {
          setToken(null);
          setUser(null);

          // Bersihkan user yang mungkin masih tertinggal
          localStorage.removeItem("user");

          return;
        }

        // Token ada tetapi data user tidak ada
        if (!savedUser) {
          setToken(savedToken);
          setUser(null);

          return;
        }

        const parsedUser: UserProfile = JSON.parse(savedUser);

        setToken(savedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to load authentication:", error);

        // Jika data authentication rusak
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = (token: string, refreshToken: string, user: UserProfile) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
