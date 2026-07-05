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
import { useEffect } from "react";

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
  const [preview, setPreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

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

    const formDataUpload = new FormData();
    formDataUpload.append("role", formData.role);
    formDataUpload.append("username", formData.username);
    formDataUpload.append("email", formData.email);
    formDataUpload.append("password", formData.password);
    if (profileImage) {
      formDataUpload.append("profile_image", profileImage);
    }
    setLoading(true);
    setError("");
    try {
      await registerApi(formDataUpload);
      alert("Registrasi berhasil");
      router.push("/login");
    } catch (error) {
      setError("Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

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
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-green-500">
            <Image
              src={preview || "/log.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <label className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
            Pilih Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

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
