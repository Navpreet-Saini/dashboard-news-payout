"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">NewsDash</Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
          <Link href="/payouts" className="text-gray-700 hover:text-blue-600 transition">Payouts</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Home</Link>
          <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Dashboard</Link>
          <Link href="/payouts" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Payouts</Link>
        </div>
      )}
    </nav>
  );
}
