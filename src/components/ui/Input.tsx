import React from "react";

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    containerClassName?: string;
};

export default function Input({
  label,
  error,
  className = "",
  containerClassName = "",
  ...props
}: InputProps) {
  return (
    <div className={containerClassName}>

      {label && (
        <label className="font-bold text-zinc-600">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          mt-1
          px-4
          py-3
          border
          rounded-xl
          outline-none
          transition
          focus:ring-2
          focus:ring-green-400
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-zinc-300"
          }
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}