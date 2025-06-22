// src/app/layout.tsx

import "../styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/Navbar"; // Optional if you use a separate Navbar
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News & Payout Dashboard",
  description: "Responsive dashboard with news, filters, and admin payouts",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50 text-black px-4 sm:px-8 md:px-16 py-6 space-y-6">
            {/* Header shown once */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-800">News Dashboard</h1>
              <Navbar />
            </div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
