"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  loginApi,
  googleLoginApi,
  googleRegisterApi,
} from "@/features/auth/auth.api";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import GoogleRoleModal from "./GoogleRoleModal";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"buyer" | "seller">("buyer");
  const [googleData, setGoogleData] = useState<{
    credential: string;
    email: string;
    name: string;
    picture: string;
  } | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username dan Password wajib diisi");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await loginApi({
        username,
        password,
      });
      login(response.access, response.refresh, response.user);
      if (response.user.role === "buyer") {
        router.push("/");
      } else if (response.user.role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      console.error(err);
      setError("Username atau Password salah");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      if (!credentialResponse.credential) {
        setError("Credential Google tidak ditemukan");
        return;
      }
      const response = await googleLoginApi(credentialResponse.credential);
      if (response.is_registered) {
        login(response.access, response.refresh, response.user);
        if (response.user.role === "buyer") {
          router.push("/");
        } else if (response.user.role === "seller") {
          router.push("/seller/dashboard");
        } else {
          router.push("/admin");
        }
      } else {
        setGoogleData({
          credential: response.credential,
          email: response.email,
          name: response.name,
          picture: response.picture,
        });
        setShowRoleModal(true);
      }
    } catch (err) {
      console.error(err);
      setError("Login Google gagal");
    }
  };

  const handleGoogleRegister = async () => {
    if (!googleData) return;
    try {
      setLoading(true);
      const response = await googleRegisterApi(
        googleData.credential,
        selectedRole,
      );
      login(response.access, response.refresh, response.user);
      setShowRoleModal(false);
      if (response.user.role === "buyer") {
        router.push("/");
      } else if (response.user.role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      console.error(err);
      setError("Register Google gagal");
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
        className="relative w-full max-w-md space-y-5 rounded-3xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex flex-col items-center">
          <div className="w-40">
            <Image
              src="/log.png"
              alt="ShopAI Logo"
              width={1000}
              height={1000}
              priority
            />
          </div>
          <h1 className="mt-3 text-3xl font-bold text-green-600">
            Selamat Datang
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-500">
            Login untuk melanjutkan ke akun ShopAI
          </p>
        </div>
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        <Input
          label="Username"
          placeholder="Masukkan Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>
          <label className="mb-2 block font-bold text-zinc-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 pr-12 transition outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
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

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-sm text-green-600 hover:underline"
          >
            Lupa Password?
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
          variant="success"
          className="w-full"
        >
          Login
        </Button>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setError("Login Google gagal");
            }}
            theme="outline"
            size="large"
            shape="pill"
            text="signin_with"
            width="100%"
          />
        </div>

        <p className="text-center text-sm text-zinc-500">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>

        <p className="text-center text-xs text-zinc-400">
          © 2026 ShopAI Marketplace
        </p>
        <GoogleRoleModal
          open={showRoleModal}
          loading={loading}
          googleData={googleData}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          onSubmit={handleGoogleRegister}
        />
        <ForgotPasswordModal
          open={showForgotModal}
          onClose={() => setShowForgotModal(false)}
        />
      </form>
    </div>
  );
}
