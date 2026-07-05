"use client";
import { Loader2 } from "lucide-react";

type FullScreenLoaderProps = {
  text?: string;
};

export default function FullScreenLoader({
  text = "Memuat...",
}: FullScreenLoaderProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Loader2 className="h-10 w-10 animate-spin text-green-600" />
      <p className="mt-4 text-sm text-zinc-500">
        {text}
      </p>
    </div>
  );
}