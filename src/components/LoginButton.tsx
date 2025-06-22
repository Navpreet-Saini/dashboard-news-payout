'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Avoid hydration mismatch by showing nothing (or a loader) while session is loading
    return null;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm">
          Logged in as <strong>{session.user?.email}</strong> ({session.user?.role})
        </p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => signIn('google')}
    >
      Sign In with Google
    </button>
  );
}
