"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-borderSubtle bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:scale-105 transition-transform">
            <path d="M4 6h7v4H7v10H4V6z" fill="currentColor" />
            <path d="M20 6h-7v4h4v10h3V6z" fill="currentColor" />
          </svg>
          <span className="font-semibold text-sm tracking-tight transition-colors">Trao-Interview Prep Kit</span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-textMuted hover:text-white transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-ghost text-sm font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost text-sm font-medium">Sign In</Link>
              <Link href="/register" className="btn-primary text-sm px-5 py-2">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
