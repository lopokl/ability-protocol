"use client";

import React from "react";
import { Challenge, Language } from "@/types/challenge";

interface ChallengeCardProps {
  challenge: Challenge;
  isSelected: boolean;
  lang: Language;
  onSelect: (challenge: Challenge) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  isSelected,
  lang,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(challenge)}
      className={`cursor-pointer rounded-xl p-4 border transition-all ${
        isSelected
          ? "border-emerald-500/80 bg-slate-900/90 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
          {challenge.category[lang]}
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          +{challenge.bounty} {challenge.token}
        </span>
      </div>

      <h3 className="font-semibold text-white mt-2 text-sm leading-snug">
        {challenge.title[lang]}
      </h3>

      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
        {challenge.description[lang]}
      </p>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="text-amber-300/90 flex items-center gap-1">
          🔬 {challenge.labReward[lang]}
        </span>
        <span className="text-slate-500">{challenge.difficulty[lang]}</span>
      </div>
    </div>
  );
};
