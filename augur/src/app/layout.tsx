import type { Metadata } from "next";
import { Literata, Lexend } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blaugur",
  description: "A Place For Devs & Their Thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-backgroundcolor">{children}</body>
    </html>
  );
}
