import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
};
export default function Button({
  children,
  loading = false,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "rounded-xl font-semibold cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-zinc-200 hover:bg-zinc-300 text-zinc-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };
  const sizes = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-base",
    lg: "py-4 px-5 text-lg",
  };
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}>
      {loading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        children
      )}
    </button>
  );
}