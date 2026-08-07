"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { RefObject } from "react";

import Button from "@/components/ui/Button";

interface Props {
  username: string;
  email?: string;
  preview: string | null;
  loading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileImageSection({
  username,
  email,
  preview,
  loading,
  fileInputRef,
  onImageChange,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg ring-4 ring-green-100">
          {preview ? (
            <Image
              src={preview}
              alt="Profile"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-green-600 text-4xl font-bold text-white">
              {username.charAt(0).toUpperCase()}
            </div>
          )}

          <Button
            type="button"
            variant="success"
            size="icon"
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute right-1 bottom-1 rounded-full shadow-lg"
          >
            <Camera size={16} />
          </Button>
        </div>

        <h3 className="mt-4 text-lg font-bold text-zinc-800">
          {username || "-"}
        </h3>

        <p className="mt-1 text-center text-sm text-zinc-500">{email}</p>

        <span className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Active
        </span>

        <Button
          type="button"
          variant="success"
          disabled={loading}
          onClick={() => fileInputRef.current?.click()}
          className="mt-5 w-full"
        >
          Ganti Foto
        </Button>

        <p className="mt-2 text-center text-xs text-zinc-500">
          JPG, PNG, JPEG, WEBP maksimal 2MB
        </p>

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onImageChange}
        />
      </div>
    </div>
  );
}
