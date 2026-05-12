"use client";
import Image from "next/image";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username dan Password wajib diisi");
      return;
    }
    setError("");
    const response = await login(username, password);
    console.log("response", response.data);
    if (response.success) {
      if (response.data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (response.data.user.role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(response.message || "Login gagal");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-emerald-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-white/80
          backdrop-blur-md
          border border-white/30
          shadow-2xl
          rounded-3xl
          p-6 sm:p-8
          space-y-4
        ">
        <div className="flex flex-col items-center space-y-4">
           <div className="w-40">
            <Image
              src="/log.png"
              alt="ShopAI Logo"
              width={1000}
              height={1000}
              priority  
            />
           </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-600">
              Selamat Datang
            </h1>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <Input
          label="Username"
          placeholder="Masukkan username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          error={!username && error ? "Username wajib diisi" : ""}/>
        <Input
          label="Password"
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={!password && error ? "Password wajib diisi" : ""}/>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-green-600 hover:text-green-700 transition">
            Lupa password?
          </button>
        </div>
        <Button
          type="submit"
          loading={loading}
          variant="success"
          className="w-full">
          Login
        </Button>
        <p className="text-center text-sm text-zinc-500">
          Belum punya akun?{" "}
          <span className="text-green-600 font-medium cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </form>
    </div>
  );
}