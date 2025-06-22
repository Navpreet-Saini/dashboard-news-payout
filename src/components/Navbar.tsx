// src/components/Navbar.tsx

'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <div className="flex items-center gap-4">
      {session ? (
        <>
          <p className="text-sm text-gray-700">
            Signed in as <strong>{session.user?.email}</strong>
          </p>
          <button
            onClick={() => signOut()}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}
