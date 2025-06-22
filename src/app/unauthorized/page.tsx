// src/app/unauthorized/page.tsx

export default function Unauthorized() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl text-red-600 font-semibold mb-4">Access Denied</h1>
      <p className="text-gray-700">You are not authorized to view this page. Please sign in as an admin.</p>
    </main>
  );
}
