"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">NewsDash</Link>
        <div className="flex space-x-4 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
          <Link href="/payouts" className="text-gray-700 hover:text-blue-600 transition">Payouts</Link>
          {session ? (
            <>
              <span className="text-gray-600 text-sm mr-2">{session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <span className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
