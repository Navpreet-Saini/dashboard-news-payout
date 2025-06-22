// src/app/admin/page.tsx

'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h1 className="text-2xl font-bold text-blue-700">Payout Dashboard</h1>
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to News
        </Link>
      </div>

      <p className="text-lg font-semibold text-gray-800">
        Welcome, Admin {session.user.name?.split(" ")[0]}
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-800">
        <div className="border-l-4 border-blue-500 pl-4">
          <h2 className="text-md font-semibold">Total Revenue</h2>
          <p className="text-xl font-bold text-green-600">$12,340</p>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <h2 className="text-md font-semibold">Pending Payouts</h2>
          <p className="text-xl font-bold text-orange-500">$4,120</p>
        </div>
        <div className="border-l-4 border-gray-500 pl-4">
          <h2 className="text-md font-semibold">Last Payout</h2>
          <p className="text-xl font-bold text-gray-600">June 15, 2025</p>
        </div>
      </div>
    </div>
  );
}
