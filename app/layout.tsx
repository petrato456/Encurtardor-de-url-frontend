import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encurtador de URL",
  description: "Transforme links longos em URLs curtas de forma rápida e simples.",
  keywords: ["encurtador de url", "url shortener", "link curto", "encurtar link"],
  authors: [{ name: "Encurtador de URL" }],
  openGraph: {
    title: "Encurtador de URL",
    description: "Transforme links longos em URLs curtas de forma rápida e simples.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Encurtador de URL",
    description: "Transforme links longos em URLs curtas de forma rápida e simples.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
