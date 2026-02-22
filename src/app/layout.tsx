import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAIBAZO",
  description: "Moderni food magazin s recepty a clanky."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="cs">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
