"use client";

import { Mail, UserCheck, Search, UserRound, UserX } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { showConfirm, showError, showSuccess } from "@/utils/alert";
import Loader from "@/components/ui/Loader";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export default function AdminUsersTable() {
  const {
    users,
    loading,
    page,
    setPage,
    totalCount,
    search,
    setSearch,
    deactivateUser,
    activateUser,
  } = useAdminUsers();

  const pageSize = 6;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleDeactivate = async (userId: number, username: string) => {
    const result = await showConfirm(
      "Nonaktifkan Pengguna?",
      `Apakah kamu yakin ingin menonaktifkan pengguna "${username}"? Pengguna tidak akan dapat login lagi, tetapi data dan riwayat transaksinya tetap tersimpan.`,
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await deactivateUser(userId);
      await showSuccess("Pengguna berhasil dinonaktifkan.");
    } catch (error) {
      console.error("Gagal menonaktifkan pengguna:", error);
      showError("Pengguna gagal dinonaktifkan. Silakan coba lagi.");
    }
  };

  const handleActivate = async (userId: number, username: string) => {
    const result = await showConfirm(
      "Aktifkan Pengguna?",
      `Apakah kamu yakin ingin mengaktifkan kembali pengguna "${username}"? Pengguna akan dapat login kembali ke ShopAI.`,
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await activateUser(userId);
      await showSuccess("Pengguna berhasil diaktifkan.");
    } catch (error) {
      console.error("Gagal mengaktifkan pengguna:", error);
      showError("Pengguna gagal diaktifkan. Silakan coba lagi.");
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Semua Pengguna
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Daftar pembeli dan penjual yang terdaftar di ShopAI
          </p>
        </div>
        <div className="relative mt-5 w-full max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari username, email, atau nama..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm text-gray-700 transition outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Pengguna
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Peran
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Bergabung
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loader text="Memuat pengguna..." size="md" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <UserRound className="h-5 w-5 text-gray-400" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    Tidak Ada Pengguna
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Belum ada pembeli atau penjual yang terdaftar.
                  </p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700">
                        {user.username.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.username}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          ID #{user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {user.email}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "seller"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {user.role === "seller" ? "Penjual" : "Pembeli"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        user.is_active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.is_active ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />

                      {user.is_active ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {formatDate(user.date_joined)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      {user.is_active ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleDeactivate(user.id, user.username)
                          }
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Nonaktifkan pengguna"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleActivate(user.id, user.username)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-emerald-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                          title="Aktifkan pengguna"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="border-t border-gray-100 px-6 pb-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </section>
  );
}
