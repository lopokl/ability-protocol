"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WalletButton } from "@/components/WalletButton";
import { useTelegram } from "@/components/TelegramProvider";
import { Language } from "@/types/challenge";

interface NavbarProps {
  lang: Language;
  onSwitchLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onSwitchLanguage }) => {
  const { isTMA, tgUser } = useTelegram();
  const [oracleOnline, setOracleOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOracle = async () => {
      try {
        const res = await fetch("http://localhost:4000/health", {
          method: "GET",
          signal: AbortSignal.timeout(2000),
        });
        if (res.ok) {
          setOracleOnline(true);
          return;
        }
      } catch {
        // Backend offline
      }
      setOracleOnline(false);
    };

    checkOracle();
    const interval = setInterval(checkOracle, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-lg border border-slate-700 bg-slate-800">
            <Image
              src="/logo.png"
              alt="Ability Protocol Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Ability Protocol
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Solana Devnet
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Telegram Mini App indicator */}
          {isTMA && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-medium">
              <span>📱 TMA Mode</span>
              {tgUser?.first_name && (
                <span className="text-slate-300">({tgUser.first_name})</span>
              )}
            </div>
          )}

          {/* Language Switcher */}
          <div className="flex items-center rounded-xl bg-slate-800/80 p-0.5 border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => onSwitchLanguage("en")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === "en"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => onSwitchLanguage("ua")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === "ua"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🇺🇦 UA
            </button>
          </div>

          {/* Dynamic Oracle Live Status */}
          <div
            className={`hidden md:flex items-center text-xs px-3 py-1.5 rounded-lg border transition-all ${
              oracleOnline
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-slate-800/60 border-slate-700/50 text-slate-400"
            }`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                oracleOnline
                  ? "bg-emerald-400 animate-ping"
                  : "bg-amber-400"
              }`}
            />
            <span>
              {oracleOnline
                ? lang === "en"
                  ? "Backend Oracle: Online (:4000)"
                  : "Бекенд Оракул: Онлайн (:4000)"
                : lang === "en"
                ? "Oracle: Client Mode"
                : "Оракул: Клієнтський режим"}
            </span>
          </div>

          <WalletButton />
        </div>
      </div>
    </header>
  );
};
