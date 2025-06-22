"use client";
import SessionProvider from "@/components/SessionProvider";
import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <SessionProvider>
      <NewsList />
    </SessionProvider>
  );
}
