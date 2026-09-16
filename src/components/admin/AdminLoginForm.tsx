"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/adminAuth";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 600));
    const ok = adminLogin(password);
    if (ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-futsal-red">
      <h2 className="text-xl font-black text-futsal-navy mb-1">Admin Login</h2>
      <p className="text-gray-400 text-sm mb-6">Enter your admin password to continue.</p>

      <div className="space-y-4">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className={`input-field pl-10 pr-10 ${error ? "input-error" : ""}`}
            required
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
          ) : (
            "Login to Admin →"
          )}
        </button>
      </div>
    </form>
  );
}
