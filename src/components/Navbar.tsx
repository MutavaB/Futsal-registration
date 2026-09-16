"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/register", label: "Register" },
  { href: "/about",    label: "About"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-futsal-navy text-white shadow-lg sticky top-0 z-50 border-b-4 border-futsal-red">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/register" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-futsal-red flex items-center justify-center text-white font-black text-sm group-hover:bg-futsal-redlight transition-colors shadow">
              FK
            </div>
            <div className="leading-tight">
              <span className="font-black text-lg tracking-tight block">FUTSAL UK</span>
              <span className="text-futsal-red text-[10px] font-bold tracking-[0.2em] uppercase block -mt-1">
                Kenya
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="ml-4 bg-futsal-red hover:bg-futsal-redlight text-white text-sm font-bold px-6 py-2 rounded-full transition-colors shadow"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-futsal-navylight border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="block mt-3 text-center bg-futsal-red hover:bg-futsal-redlight text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
          >
            Join Now
          </Link>
        </div>
      )}
    </nav>
  );
}
