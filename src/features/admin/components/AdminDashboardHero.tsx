import { CalendarDays } from "lucide-react";

export default function AdminDashboardHero() {
  const currentDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 px-6 py-7 shadow-xl shadow-emerald-900/10 sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="pointer-events-none absolute top-8 right-20 hidden h-24 w-24 rotate-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm lg:block" />

      <div className="pointer-events-none absolute right-8 bottom-8 hidden h-12 w-12 -rotate-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm lg:block" />

      <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
            ShopAI Administration
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Selamat Datang, Admin
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/80 sm:text-base">
            Kelola marketplace dengan lebih mudah, pantau aktivitas pengguna,
            dan kendalikan seluruh operasional dari satu dashboard.
          </p>
        </div>

        <div className="shrink-0 lg:pr-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <CalendarDays size={19} className="text-white" />
              </div>

              <div>
                <p className="text-xs text-emerald-100/70">Hari Ini</p>

                <p className="mt-0.5 text-sm font-semibold text-white">
                  {currentDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
