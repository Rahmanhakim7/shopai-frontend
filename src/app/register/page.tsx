"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(name, username, password);
    } catch (error) {
      console.error("Register gagal:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-8">
        <h1 className="text-2xl font-bold text-zinc-800 mb-6 text-center">
          ShopAI
        </h1>
        <h2 className="text-xl font-bold text-zinc-900 text-center">
          Create Account ✨
        </h2>
        <p className="text-zinc-500 mt-2 mb-6 text-center text-sm">
          Sign up to start using ShopAI
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-zinc-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose username"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>

    </main>
  );
}