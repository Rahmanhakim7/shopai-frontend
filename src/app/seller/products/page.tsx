"use client";
import SellerLayout from "@/layouts/sellerlayouts";

export default function SellerProducts() {
    return (
        <SellerLayout title="Products">
          <h1 className="text-2xl font-bold mb-4">My Products</h1>
          <p>Here you can manage your products. Add new products, edit existing ones, and keep track of your inventory.</p>
        </SellerLayout>
    )
}