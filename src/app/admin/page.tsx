'use client';
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  
  if (!session || session.user.role !== "admin") {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>You must be an admin to view this page</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Admin-only content here */}
    </div>
  );
}
