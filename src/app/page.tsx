// src/app/page.tsx

'use client';

import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <main className="space-y-6">
      {/* Only the news content; header already in layout */}
      <NewsList />
    </main>
  );
}
