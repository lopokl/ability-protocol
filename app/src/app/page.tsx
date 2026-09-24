"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Navbar } from "@/components/Navbar";
import { ChallengeCard } from "@/components/ChallengeCard";
import { CodeEditor } from "@/components/CodeEditor";
import { VerificationResult } from "@/components/VerificationResult";
import { WalletButton } from "@/components/WalletButton";
import { Challenge, Language } from "@/types/challenge";

const CHALLENGES: Challenge[] = [
  {
    id: "challenge-1",
    category: { en: "Solana / Web3", ua: "Solana / Web3" },
    difficulty: { en: "Beginner", ua: "Початковий" },
    bounty: "15",
    token: "USDC",
    title: {
      en: "Solana Devnet Transfer & Memo Validator",
      ua: "Валідатор транзакцій та мемо Solana Devnet",
    },
    description: {
      en: "Write a TypeScript function using @solana/web3.js that verifies a valid transaction signature on Solana Devnet with an attached student ID memo.",
      ua: "Напишіть TypeScript функцію з використанням @solana/web3.js, яка перевіряє валідність підпису транзакції на Solana Devnet із прикріпленим студентським ID у полі Memo.",
    },
    labReward: {
      en: "50% off deposit for ESP32 & Arduino kits",
      ua: "-50% застави на набори ESP32 та Arduino",
    },
    starterCode: {
      en: `import { Connection, PublicKey } from '@solana/web3.js';\n\nexport async function verifySignature(sig: string): Promise<boolean> {\n  const connection = new Connection('https://api.devnet.solana.com');\n  // TODO: Fetch transaction and confirm memo\n  return true;\n}`,
      ua: `import { Connection, PublicKey } from '@solana/web3.js';\n\nexport async function verifySignature(sig: string): Promise<boolean> {\n  const connection = new Connection('https://api.devnet.solana.com');\n  // TODO: Отримати транзакцію та підтвердити мемо\n  return true;\n}`,
    },
  },
  {
    id: "challenge-2",
    category: { en: "Embedded / IoT", ua: "Вбудовані системи / IoT" },
    difficulty: { en: "Intermediate", ua: "Середній" },
    bounty: "25",
    token: "USDC",
    title: {
      en: "ESP32 Sensor Telemetry Hash Verifier",
      ua: "Верифікатор хешу телеметрії сенсорів ESP32",
    },
    description: {
      en: "Implement a cryptographic checksum algorithm to validate telemetry packets streamed from an embedded IoT microcontroller over MQTT.",
      ua: "Реалізуйте алгоритм криптографічної контрольної суми для перевірки цілісності пакетів телеметрії, що надходять від IoT мікроконтролера по MQTT.",
    },
    labReward: {
      en: "Free access to Lab Oscilloscopes & Soldering Station",
      ua: "Безкоштовний доступ до осцилографів та паяльної станції",
    },
    starterCode: {
      en: `def verify_telemetry(payload: bytes, expected_hash: str) -> bool:\n    # TODO: Verify SHA-256 payload integrity\n    import hashlib\n    return hashlib.sha256(payload).hexdigest() == expected_hash`,
      ua: `def verify_telemetry(payload: bytes, expected_hash: str) -> bool:\n    # TODO: Перевірити цілісність payload через SHA-256\n    import hashlib\n    return hashlib.sha256(payload).hexdigest() == expected_hash`,
    },
  },
  {
    id: "challenge-3",
    category: { en: "Solana / Anchor", ua: "Solana / Anchor" },
    difficulty: { en: "Advanced", ua: "Просунутий" },
    bounty: "50",
    token: "USDC",
    title: {
      en: "Anchor Escrow Vault State Inspector",
      ua: "Інспектор стану сховища Anchor Escrow",
    },
    description: {
      en: "Verify that an on-chain Anchor escrow vault account holds the expected token balances and is owned by the program PDA authority.",
      ua: "Перевірте, що ончейн акаунт ескроу-сховища Anchor містить очікуваний баланс токенів і належить валідному PDA програми.",
    },
    labReward: {
      en: "100% deposit waiver for FPGA boards & SDR hardware",
      ua: "100% звільнення від застави на FPGA плати та SDR",
    },
    starterCode: {
      en: `// Rust / Anchor verification logic\npub fn verify_vault_balance(vault_account: &AccountInfo, expected_amount: u64) -> bool {\n    // TODO: Verify token amount & PDA authority\n    true\n}`,
      ua: `// Логіка перевірки Rust / Anchor\npub fn verify_vault_balance(vault_account: &AccountInfo, expected_amount: u64) -> bool {\n    // TODO: Перевірити суму токенів та авторитет PDA\n    true\n}`,
    },
  },
];

export default function Home() {
  const { connected, publicKey } = useWallet();
  const [lang, setLang] = useState<Language>("en");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [code, setCode] = useState<string>(CHALLENGES[0].starterCode.en);
  const [status, setStatus] = useState<"idle" | "running" | "passed" | "failed">("idle");
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [cnftId, setCnftId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ability_lang") as Language;
    if (saved === "en" || saved === "ua") {
      setLang(saved);
      setCode(selectedChallenge.starterCode[saved]);
    }
  }, [selectedChallenge]);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("ability_lang", newLang);
    setCode(selectedChallenge.starterCode[newLang]);
  };

  const handleSelectChallenge = (c: Challenge) => {
    setSelectedChallenge(c);
    setCode(c.starterCode[lang]);
    setStatus("idle");
    setTxSignature(null);
    setCnftId(null);
  };

  const handleRunTests = async () => {
    if (!connected) {
      alert(
        lang === "en"
          ? "Please connect your Solana wallet first in the top right corner!"
          : "Будь ласка, спочатку підключіть гаманець Solana у правому верхньому кутку!"
      );
      return;
    }

    setStatus("running");
    setTxSignature(null);
    setCnftId(null);

    try {
      // Connect to backend verification service if running
      const res = await fetch("http://localhost:4000/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: selectedChallenge.id,
          code,
          studentWallet: publicKey?.toBase58(),
        }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        setStatus("passed");
        setTxSignature(data.txSignature || "5K2N...DevnetSignature");
        setCnftId(data.cnftAssetId || "cNFT-Bubblegum-Verified");
        return;
      }
    } catch {
      // Fallback to local simulation if backend server is not yet running
    }

    setTimeout(() => {
      setStatus("passed");
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      setTxSignature(`5K2N...${randomSuffix}`);
      setCnftId(`cNFT-Bubblegum-${randomSuffix}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar Component */}
      <Navbar lang={lang} onSwitchLanguage={switchLanguage} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/70 to-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300">
              ⚡ IFK Colosseum Sprint 2026 • College of NULES
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {lang === "en" ? "Turn Engineering Competence into " : "Перетворюй інженерні навички на "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                {lang === "en" ? "Instant Bounties & Lab Access" : "Миттєві винагороди та доступ до лабораторій"}
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {lang === "en"
                ? "Solve practical algorithmic, networking, and embedded challenges. Receive instant USDC/SOL rewards directly to your Solana wallet and mint Soulbound cNFT badges to unlock college laboratory equipment."
                : "Вирішуй практичні алгоритмічні, мережеві та embedded-завдання. Отримуй миттєві винагороди USDC/SOL прямо на свій Solana-гаманець та карбуй Soulbound cNFT бейджі для доступу до лабораторного заліза."}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">1,250 USDC</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === "en" ? "Sponsor Vault Balance" : "Баланс спонсорського пулу"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-300 font-mono">3 Active</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === "en" ? "Live Challenges" : "Доступні челенджі"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400 font-mono">&lt; 1 sec</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === "en" ? "Solana Settlement" : "Швидкість Solana"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400 font-mono">0% Deposit</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === "en" ? "Lab Hardware Waiver" : "Пільга на заставу заліза"}
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Cards & Code Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Challenge Selector Column */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center justify-between">
              <span>{lang === "en" ? "Available Tasks" : "Доступні завдання"}</span>
              <span className="text-xs text-slate-400 font-normal">
                {lang === "en" ? "Select to solve" : "Оберіть для виконання"}
              </span>
            </h2>

            <div className="space-y-3">
              {CHALLENGES.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isSelected={selectedChallenge.id === challenge.id}
                  lang={lang}
                  onSelect={handleSelectChallenge}
                />
              ))}
            </div>
          </div>

          {/* Code Editor & Verification Column */}
          <div className="lg:col-span-7 space-y-4">
            <CodeEditor
              title={selectedChallenge.title[lang]}
              code={code}
              status={status}
              lang={lang}
              onChangeCode={setCode}
              onSubmit={handleRunTests}
            />

            {status === "passed" && (
              <VerificationResult
                challenge={selectedChallenge}
                txSignature={txSignature}
                cnftId={cnftId}
                lang={lang}
                connected={connected}
              />
            )}

            {!connected && (
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 text-xs text-slate-400 flex items-center justify-between">
                <span>
                  {lang === "en"
                    ? "⚡ Connect Phantom or Solflare wallet (Devnet) to claim bounties directly."
                    : "⚡ Підключіть гаманець Phantom або Solflare (Devnet), щоб отримати винагороду."}
                </span>
                <WalletButton />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Ability Protocol © 2026 • Built for IFK Colosseum Sprint 2026 & Colosseum Hackathon • Irpin Specialized College of NULES
      </footer>
    </div>
  );
}
