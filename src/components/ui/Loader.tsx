"use client";

import { Loader2 } from "lucide-react";
import clsx from "clsx";

type LoaderProps = {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
};

const spinnerSize = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

const textSize = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export default function Loader({
  text = "Memuat...",
  size = "md",
  fullScreen = false,
  className = "",
}: LoaderProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center",
        fullScreen ? "min-h-screen" : "py-10",
        className,
      )}
    >
      <Loader2
        className={clsx("animate-spin text-green-600", spinnerSize[size])}
      />

      {text && (
        <p className={clsx("mt-4 text-zinc-500", textSize[size])}>{text}</p>
      )}
    </div>
  );
}
