import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export default function Textarea({
  label,
  error,
  className = "",
  containerClassName = "",
  ...props
}: TextareaProps) {
  return (
    <div className={containerClassName}>
      {label && <label className="font-bold text-zinc-600">{label}</label>}

      <textarea
        {...props}
        className={`mt-1 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-700 transition-all duration-200 outline-none placeholder:text-zinc-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 ${
          error ? "border-red-500 focus:ring-red-400" : "border-zinc-300"
        } ${className} `}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
