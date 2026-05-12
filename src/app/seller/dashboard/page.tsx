"use client";

import SellerLayout from "@/layouts/sellerlayouts";

export default function SellerDashboard() {
  return (
    <SellerLayout title="Dashboard">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-800">
          Seller Dashboard
        </h1>

        <p className="text-zinc-500 mt-2">
          Selamat datang kembali 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-zinc-500 text-sm">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            120
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-zinc-500 text-sm">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            540
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-zinc-500 text-sm">
            Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Rp 12M
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-zinc-500 text-sm">
            Customers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            320
          </h2>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-zinc-800">
            Recent Orders
          </h2>

          <button className="text-sm text-green-600 hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b text-left text-zinc-500">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Product</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4">#1024</td>
                <td>Rahman</td>
                <td>Gaming Mouse</td>
                <td>Rp 250.000</td>

                <td>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">#1025</td>
                <td>Budi</td>
                <td>Mechanical Keyboard</td>
                <td>Rp 850.000</td>

                <td>
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                    Pending
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </SellerLayout>
  );
}