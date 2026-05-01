import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carbon-Loss Tracker",
  description:
    "Estimasi pelepasan emisi karbon berdasarkan deforestasi di Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
