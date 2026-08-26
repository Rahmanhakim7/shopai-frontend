"use client";

import { Users } from "lucide-react";

export default function AdminUsersHero() {
  return (
    <section className="group relative isolate overflow-hidden rounded-[28px] border border-emerald-900/10 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-700 shadow-xl shadow-emerald-950/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-green-300/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-48 w-48 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 -right-10 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-white/[0.08] lg:block">
        <div className="absolute inset-6 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-12 rounded-full border border-white/[0.06]" />
      </div>
      <div className="relative flex flex-col p-7 sm:p-8 lg:px-10 lg:py-9">
        <div className="flex items-start gap-5">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-lg shadow-emerald-950/10 backdrop-blur-md">
            <div className="absolute inset-0 rounded-2xl bg-white/10 blur-xl" />
            <Users className="relative" size={25} strokeWidth={1.8} />
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              User Management
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-[15px]">
              Kelola seluruh pengguna ShopAI dalam satu tempat. Pantau buyer dan
              seller untuk menjaga ekosistem marketplace tetap terkelola dengan
              baik.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                <span className="text-xs font-medium text-white/80">
                  User Management
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <Users size={13} strokeWidth={1.8} className="text-white/80" />
                <span className="text-xs font-medium text-white/80">
                  Penjual dan Pembeli
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
