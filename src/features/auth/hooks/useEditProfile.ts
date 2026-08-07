"use client";

import { useEffect, useRef, useState } from "react";
import { UserProfile } from "@/types/auth";
import { getImageUrl } from "@/utils/image";
import { showError } from "@/utils/alert";
import { validateProfileImage } from "../utils/validateProfileImage";
import { createImagePreview, revokeImagePreview } from "../utils/imagePreview";

interface UseEditProfileProps {
  user: UserProfile | null;
  onClose: () => void;
}

export function useEditProfile({ user, onClose }: UseEditProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPreview(getImageUrl(user.profile_image));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      revokeImagePreview(preview);
    };
  }, [preview]);

  const resetForm = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (user) {
      setUsername(user.username);
      setPreview(getImageUrl(user.profile_image));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const error = validateProfileImage(file);
    if (error) {
      showError(error);
      return;
    }

    revokeImagePreview(preview);
    setImage(file);
    setPreview(createImagePreview(file));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return {
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
  };
}
