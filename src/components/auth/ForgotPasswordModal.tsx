"use client";

import { useState } from "react";
import { Mail, X } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { forgotPasswordApi } from "@/features/auth/auth.api";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ForgotPasswordModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!email) {
      setError("Email wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await forgotPasswordApi(email);

      setSuccess(response.message);
    } catch (err) {
      console.error(err);
      setError("Gagal mengirim email reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setSuccess("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-600">Reset Password</h2>

          <button onClick={handleClose}>
            <X />
          </button>
        </div>

        <p className="mb-5 text-sm text-zinc-500">
          Masukkan email akun Anda. Kami akan mengirimkan link untuk mengganti
          password.
        </p>

        {success && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
        />

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={handleClose}
          >
            Batal
          </Button>

          <Button
            type="button"
            variant="success"
            className="flex-1"
            loading={loading}
            onClick={handleSubmit}
          >
            Kirim Link
          </Button>
        </div>
      </div>
    </div>
  );
}
