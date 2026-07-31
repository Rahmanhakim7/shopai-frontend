"use client";

import { Loader2 } from "lucide-react";

type FullScreenLoaderProps = {
  text?: string;
  fullScreen?: boolean;
};

export default function FullScreenLoader({
  text = "Memuat...",
  fullScreen = true,
}: FullScreenLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-white ${
        fullScreen ? "min-h-screen" : "min-h-[60vh] rounded-2xl"
      }`}
    >
      <Loader2 className="h-10 w-10 animate-spin text-green-600" />

      <p className="mt-4 text-sm text-zinc-500">{text}</p>
    </div>
  );
}
