import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import { TelegramProvider } from "@/components/TelegramProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ability Protocol ⚡ | Solana Proof-of-Skill & Escrow",
  description:
    "On-chain skill verification and escrow protocol on Solana, connecting technical students with sponsor bounties and lab resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <TelegramProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
