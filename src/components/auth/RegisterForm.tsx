"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerApi } from "@/features/auth/auth.api";
import { RegisterRequest } from "@/types/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError("Semua field wajib diisi");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Format email tidak valid");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerApi(formData);
      alert("Registrasi berhasil");
      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-white to-emerald-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-3xl border border-white/30 bg-white/80 p-6 shadow-2xl backdrop-blur-md sm:p-8"
      >
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
            <p className="mt-2 text-xl font-bold text-green-600">
              Daftar untuk mulai menggunakan ShopAI
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Username"
          name="username"
          placeholder="Masukkan username"
          value={formData.username}
          autoComplete="username"
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Masukkan email"
          value={formData.email}
          autoComplete="email"
          onChange={handleChange}
        />

        <div>
          <label className="mb-2 block font-bold text-zinc-600">
            Daftar Sebagai
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-500"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold text-zinc-600">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 pr-12 outline-none focus:border-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          variant="success"
          loading={loading}
          className="w-full"
        >
          Daftar
        </Button>

        <p className="text-center text-sm text-zinc-500">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
