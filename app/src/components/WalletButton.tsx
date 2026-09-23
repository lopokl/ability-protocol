"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import WalletMultiButton to prevent Next.js SSR hydration mismatch
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const WalletButton = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-800" />
    );
  }

  return <WalletMultiButtonDynamic className="!bg-gradient-to-r !from-emerald-500 !to-teal-600 hover:!from-emerald-600 hover:!to-teal-700 !transition-all !rounded-xl !h-10 !text-sm !font-semibold !shadow-lg !shadow-emerald-500/20" />;
};
