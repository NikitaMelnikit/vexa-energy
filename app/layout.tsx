import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VEXA — Packaging & Motion Design Case Study",
  description: "A fictional packaging and interactive motion design study built around four VEXA visual editions.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
