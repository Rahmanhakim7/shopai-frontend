import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
  variant?: "default" | "checkbox" | "radio";
};

export default function Input({
  label,
  error,
  className = "",
  containerClassName = "",
  variant = "default",
  ...props
}: InputProps) {
  const isCheckbox = variant === "checkbox";
  const isRadio = variant === "radio";

  return (
    <div className={containerClassName}>
      {label && !isCheckbox && (
        <label className="font-bold text-zinc-600">{label}</label>
      )}

      <input
        {...props}
        className={`transition ${
          isCheckbox || isRadio
            ? "m-0 h-4 w-4 shrink-0 cursor-pointer p-0 align-middle accent-green-500"
            : `mt-1 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-700 transition-all duration-200 outline-none placeholder:text-zinc-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 ${error ? "border-red-500 focus:ring-red-400" : "border-zinc-300"} `
        } ${className} `}
      />
      {error && !isCheckbox && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
