import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sudoku Resolver",
  description: "9x9 Sudoku puzzle resolver",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="md:flex md:flex-col md:h-screen space-y-8">
        {children}
        <Footer />
      </body>
    </html>
  );
}
