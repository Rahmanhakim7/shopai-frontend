"use client";

import { X } from "lucide-react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button";
import ProfileForm from "./ProfileForm";
import ProfileImageSection from "./ProfileImageSection";
import { UserProfile } from "@/types/auth";
import { updateProfile } from "@/features/auth/profile";
import { useEditProfile } from "@/features/auth/hooks/useEditProfile";
import { showError, showSuccess, showWarning } from "@/utils/alert";

interface Props {
  open: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onSuccess: () => Promise<void>;
}

export default function EditProfileModal({
  open,
  onClose,
  user,
  onSuccess,
}: Props) {
  const {
    fileInputRef,
    username,
    setUsername,
    preview,
    image,
    loading,
    setLoading,
    mounted,
    resetForm,
    handleImageChange,
    handleClose,
  } = useEditProfile({
    user,
    onClose,
  });

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

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Edit Profile</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Perbarui informasi akun Anda.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={loading}
            onClick={handleClose}
            className="rounded-full text-red-500 hover:bg-red-100 hover:text-red-700"
          >
            <X size={20} strokeWidth={3} />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-[260px_1fr]">
          <ProfileImageSection
            username={username}
            email={user?.email}
            preview={preview}
            loading={loading}
            fileInputRef={fileInputRef}
            onImageChange={handleImageChange}
          />
          <div className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
            <ProfileForm
              username={username}
              email={user?.email}
              role={user?.role}
              onUsernameChange={setUsername}
            />
            <div className="mt-auto pt-3">
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
