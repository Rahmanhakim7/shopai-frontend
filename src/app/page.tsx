import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-950 dark:to-black text-zinc-900 dark:text-white font-sans">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-200/70 dark:border-zinc-800 backdrop-blur-md sticky top-0 bg-white/70 dark:bg-black/40">
        <h1 className="text-2xl font-bold tracking-tight">
          ShopAI <span className="text-emerald-500">🚀</span>
        </h1>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition">
            Register
          </Link>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2" />
        <h2 className="text-4xl md:text-6xl font-extrabold max-w-4xl leading-tight z-10">
          Marketplace Modern untuk{" "}
          <span className="text-emerald-500">Seller & Buyer</span>{" "}
          Masa Depan
        </h2>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl z-10">
          Bangun toko online, kelola produk, transaksi, dan order system
          dengan experience cepat, modern, dan scalable menggunakan Next.js & Django.
        </p>
        <div className="flex gap-4 mt-10 z-10">
          <Link
            href="/login"
            className="px-6 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black text-lg font-medium hover:scale-105 transition shadow-lg">
            Mulai Sekarang
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 text-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
            Pelajari
          </Link>
        </div>
      </section>
      <section
        id="features"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-24 max-w-6xl mx-auto">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200 dark:border-zinc-800 hover:scale-[1.02] transition">
          <h3 className="text-xl font-bold mb-3">
            🔐 Secure Authentication
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            JWT authentication dengan sistem role (buyer, seller, admin)
            yang siap production.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200 dark:border-zinc-800 hover:scale-[1.02] transition">
          <h3 className="text-xl font-bold mb-3">
            🛒 Marketplace System
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Produk, cart, order, seller dashboard, dan transaksi lengkap.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200 dark:border-zinc-800 hover:scale-[1.02] transition">
          <h3 className="text-xl font-bold mb-3">
            ⚡ High Performance
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Next.js + Django REST API dengan struktur scalable dan cepat.
          </p>
        </div>
      </section>
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-zinc-500">
        © 2026 ShopAI. Built with Next.js & Django 🚀
      </footer>
    </div>
  );
}