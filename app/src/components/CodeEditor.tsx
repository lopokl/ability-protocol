"use client";

import React from "react";
import { Language } from "@/types/challenge";

interface CodeEditorProps {
  title: string;
  code: string;
  status: "idle" | "running" | "passed" | "failed";
  lang: Language;
  onChangeCode: (newCode: string) => void;
  onSubmit: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  title,
  code,
  status,
  lang,
  onChangeCode,
  onSubmit,
}) => {
  const isRunning = status === "running";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {lang === "en" ? "Solution Workspace" : "Робоча область"}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === "en"
              ? "Deterministic Test Runner Sandbox"
              : "Пісочниця верифікації розв'язку"}
          </p>
        </div>

        <button
          onClick={onSubmit}
          disabled={isRunning}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg flex items-center gap-2 ${
            isRunning
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/20 active:scale-95"
          }`}
        >
          {isRunning ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              {lang === "en" ? "Running Tests..." : "Виконання тестів..."}
            </>
          ) : (
            <>{lang === "en" ? "⚡ Submit & Verify" : "⚡ Надіслати та перевірити"}</>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-slate-300">{title}</span>
          </div>
          <span>Devnet Sandbox</span>
        </div>

        <textarea
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          rows={11}
          className="w-full bg-slate-950 p-4 font-mono text-xs sm:text-sm text-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-y leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
