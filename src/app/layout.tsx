import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Futsal UK Kenya | Player Registration",
  description:
    "Official player registration portal for Futsal UK Kenya. Join the fastest growing futsal community in Kenya.",
  keywords: "futsal, kenya, football, registration, futsal kenya, futsal uk",
  openGraph: {
    title: "Futsal UK Kenya – Player Registration",
    description: "Register as a Futsal UK Kenya player today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
