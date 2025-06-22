// src/app/payout/page.tsx
'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PayoutDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  if (status === "loading") return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Payout Dashboard</h1>
      <p className="text-lg">Welcome, Admin {session?.user?.name?.split(" ")[0]}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p className="text-2xl text-green-600 mt-2">$12,340</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold">Pending Payouts</h2>
          <p className="text-2xl text-yellow-600 mt-2">$4,120</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold">Last Payout</h2>
          <p className="text-2xl text-blue-600 mt-2">June 15, 2025</p>
        </div>
      </div>
    </div>
  );
}
