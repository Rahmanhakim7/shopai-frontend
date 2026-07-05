"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { resetPasswordApi } from "@/features/auth/auth.api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!uid || !token) {
      setError("Link reset password tidak valid.");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    try {
      setLoading(true);
      const response = await resetPasswordApi(uid, token, password);
      setSuccess(response.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Gagal mengganti password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-white to-emerald-100 px-4 py-8">
      <div className="absolute top-10 left-10 h-60 w-60 rounded-full bg-green-300/30 blur-3xl"></div>
      <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl"></div>
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-3xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur-md"
      >
        <div className="flex flex-col items-center">
          <div className="w-40">
            <Image
              src="/log.png"
              alt="ShopAI"
              width={1000}
              height={1000}
              priority
            />
          </div>
          <h1 className="mt-3 text-3xl font-bold text-green-600">
            Reset Password
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-500">
            Masukkan password baru untuk akun Anda.
          </p>
        </div>
        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}
        <div className="mt-5">
          <label className="mb-2 block font-bold text-zinc-700">
            Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 pr-12 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              placeholder="Masukkan Password Baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="mt-5">
          <label className="mb-2 block font-bold text-zinc-700">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 pr-12 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          variant="success"
          className="mt-8 w-full"
        >
          Simpan Password
        </Button>
      </form>
    </div>
  );
}
