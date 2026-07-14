"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { UserProfile } from "@/types/auth";
import { createPortal } from "react-dom";
import { updateProfile } from "@/features/auth/profile";
import Input from "@/components/ui/Input";
import { showError, showSuccess, showWarning } from "@/utils/alert";

interface Props {
  open: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onSuccess: () => Promise<void>;
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
export default function EditProfileModal({
  open,
  onClose,
  user,
  onSuccess,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const getProfileImage = (user: UserProfile | null) => {
    if (!user?.profile_image) return null;
    return `${process.env.NEXT_PUBLIC_API_URL}${user.profile_image}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPreview(getProfileImage(user));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showError("Format gambar harus JPG, PNG, atau WEBP");
      return;
    }
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    if (file.size > MAX_IMAGE_SIZE) {
      showError("Ukuran gambar maksimal 2MB");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImage(file);
    setPreview(objectUrl);
  };

  const resetForm = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (user) {
      setUsername(user.username);
      setPreview(getProfileImage(user));
    }
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      showWarning("Username tidak boleh kosong");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", username.trim());
      if (image) {
        formData.append("profile_image", image);
      }
      await updateProfile(formData);
      await onSuccess();
      await showSuccess("Profil berhasil diperbarui");
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      showError("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open || !mounted) return null;
  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-6 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-zinc-200 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Edit Profile</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Perbarui informasi akun Anda.
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleClose}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <X size={22} />
          </button>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-10 overflow-y-auto p-8 lg:grid-cols-[300px_1fr]">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg ring-4 ring-green-100">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-green-600 text-5xl font-bold text-white">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
                <Button
                  type="button"
                  variant="success"
                  size="icon"
                  disabled={loading}
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-3 bottom-3 rounded-full shadow-lg"
                >
                  <Camera size={18} />
                </Button>
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-800">
                {username || "-"}
              </h3>
              <p className="mt-1 text-center text-sm text-zinc-500">
                {user?.email}
              </p>
              <span className="mt-4 rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Active
              </span>
              <Button
                type="button"
                variant="success"
                disabled={loading}
                onClick={() => fileInputRef.current?.click()}
                className="mt-8 w-full"
              >
                Ganti Foto
              </Button>
              <p className="mt-3 text-center text-xs text-zinc-500">
                JPG, PNG, JPEG, WEBP maksimal 2MB
              </p>
              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="flex h-full flex-col rounded-3xl border-zinc-200 bg-white p-8 shadow-sm">
            <div>
              <h3 className="mb-6 text-lg font-semibold text-zinc-800">
                Personal Information
              </h3>
              <div className="space-y-6">
                <div>
                  <Input
                    label="Username"
                    value={username}
                    maxLength={30}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    label="Email"
                    readOnly
                    value={user?.email || ""}
                    className="border-zinc-200 bg-zinc-100 text-zinc-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">
                    Role
                  </label>
                  <div className="mt-2">
                    <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 capitalize">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto border-zinc-200 pt-6">
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  disabled={loading}
                  onClick={handleClose}
                >
                  Batal
                </Button>
                <Button
                  loading={loading}
                  variant="success"
                  onClick={handleSubmit}
                >
                  Simpan Perubahan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
