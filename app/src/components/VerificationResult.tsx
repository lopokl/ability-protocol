"use client";

import React from "react";
import { Challenge, Language } from "@/types/challenge";

interface VerificationResultProps {
  challenge: Challenge;
  txSignature: string | null;
  cnftId: string | null;
  lang: Language;
  connected: boolean;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({
  challenge,
  txSignature,
  cnftId,
  lang,
  connected,
}) => {
  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          {lang === "en"
            ? "Verification Passed! All Test Suites Completed."
            : "Верифікацію пройдено! Всі тести виконано успішно."}
        </div>
        <span className="text-xs font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
          STATUS: 200 OK
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
        <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3">
          <div className="text-slate-400">
            {lang === "en" ? "Automated Payout:" : "Автоматична виплата:"}
          </div>
          <div className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
            +{challenge.bounty} {challenge.token}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono break-all">
            Tx: {txSignature}
          </div>
        </div>

        <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3">
          <div className="text-slate-400">
            {lang === "en"
              ? "Soulbound Proof-of-Skill:"
              : "Soulbound підтвердження навичок:"}
          </div>
          <div className="font-mono text-teal-300 font-bold text-sm mt-0.5">
            cNFT Minted (Bubblegum)
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {cnftId ? `Asset: ${cnftId} • ` : ""}
            {challenge.labReward[lang]}
          </div>
        </div>
      </div>

      {!connected && (
        <p className="text-xs text-amber-300/90 pt-1">
          {lang === "en"
            ? "⚠️ Note: Connect your Solana wallet in the top bar to record payouts to your personal address."
            : "⚠️ Примітка: Підключіть свій Solana-гаманець у шапці сайту, щоб зафіксувати виплату на власну адресу."}
        </p>
      )}
    </div>
  );
};
