import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "./providers"; // If you use Redux/Context
import type { ReactNode } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News & Payout Dashboard",
  description: "Responsive dashboard with news, filters, and admin payouts",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Providers>
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                News Dashboard
              </h1>
              <p className="text-gray-500 mt-2">
                Stay updated with the latest news and manage payouts efficiently.
              </p>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
