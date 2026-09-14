import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
  variant?: "default" | "checkbox" | "radio";
  icon?: React.ReactNode;
};

export default function Input({
  label,
  error,
  className = "",
  containerClassName = "",
  variant = "default",
  icon,
  ...props
}: InputProps) {
  const isCheckbox = variant === "checkbox";
  const isRadio = variant === "radio";

  return (
    <div className={containerClassName}>
      {label && !isCheckbox && (
        <label className="font-bold text-zinc-600">{label}</label>
      )}

      <div className={isCheckbox || isRadio ? "" : "relative"}>
        {icon && !isCheckbox && !isRadio && (
          <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`transition ${
            isCheckbox || isRadio
              ? "m-0 h-4 w-4 shrink-0 cursor-pointer p-0 align-middle accent-green-500"
              : `mt-1 w-full rounded-xl border border-zinc-300 bg-white py-3 pr-4 text-sm text-zinc-700 transition-all duration-200 outline-none placeholder:text-zinc-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 ${
                  icon ? "pl-11" : "px-4"
                } ${
                  error
                    ? "border-red-500 focus:ring-red-400"
                    : "border-zinc-300"
                }`
          } ${className}`}
        />
      </div>

      {error && !isCheckbox && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
