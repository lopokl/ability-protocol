"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/WalletButton";

type Language = "en" | "ua";

interface ChallengeI18n {
  id: string;
  category: { en: string; ua: string };
  difficulty: { en: string; ua: string };
  bounty: string;
  token: string;
  title: { en: string; ua: string };
  description: { en: string; ua: string };
  labReward: { en: string; ua: string };
  starterCode: { en: string; ua: string };
}

const CHALLENGES: ChallengeI18n[] = [
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

const TRANSLATIONS = {
  en: {
    network: "Solana Devnet",
    oracleStatus: "Oracle: Active",
    badgeSprint: "⚡ IFK Colosseum Sprint 2026 • College of NULES",
    heroTitlePrefix: "Turn Engineering Competence into",
    heroTitleHighlight: "Instant Bounties & Lab Access",
    heroDescription:
      "Solve practical algorithmic, networking, and embedded challenges. Receive instant USDC/SOL rewards directly to your Solana wallet and mint Soulbound cNFT badges to unlock college laboratory equipment.",
    statVault: "1,250 USDC",
    statVaultLabel: "Sponsor Vault Balance",
    statChallenges: "3 Active",
    statChallengesLabel: "Live Challenges",
    statSpeed: "< 1 sec",
    statSpeedLabel: "Solana Settlement",
    statDeposit: "0% Deposit",
    statDepositLabel: "Lab Hardware Waiver",
    availableTasks: "Available Tasks",
    selectToSolve: "Select to solve",
    workspaceTitle: "Solution Workspace",
    workspaceSubtitle: "Deterministic Test Runner Sandbox",
    runTests: "⚡ Submit & Verify",
    runningTests: "Running Tests...",
    sandboxLabel: "Devnet Sandbox",
    passedTitle: "Verification Passed! All Test Suites Completed.",
    statusOk: "STATUS: 200 OK",
    automatedPayout: "Automated Payout:",
    soulboundAttestation: "Soulbound Proof-of-Skill:",
    cnftMinted: "cNFT Minted (Bubblegum)",
    walletNotice:
      "⚠️ Note: Connect your Solana wallet in the top bar to record payouts to your personal address.",
    connectWalletBanner:
      "⚡ Connect Phantom or Solflare wallet (Devnet) to claim bounties directly.",
    alertConnect:
      "Please connect your Solana wallet first in the top right corner!",
    footer:
      "Ability Protocol © 2026 • Built for IFK Colosseum Sprint 2026 & Colosseum Hackathon • Irpin Specialized College of NULES",
  },
  ua: {
    network: "Solana Devnet",
    oracleStatus: "Оракул: Активний",
    badgeSprint: "⚡ IFK Colosseum Sprint 2026 • ВСП «ІФК НУБіП України»",
    heroTitlePrefix: "Перетворюй інженерні навички на",
    heroTitleHighlight: "Миттєві винагороди та доступ до лабораторій",
    heroDescription:
      "Вирішуй практичні алгоритмічні, мережеві та embedded-завдання. Отримуй миттєві винагороди USDC/SOL прямо на свій Solana-гаманець та карбуй Soulbound cNFT бейджі для безкоштовного доступу до обладнання коледжу.",
    statVault: "1,250 USDC",
    statVaultLabel: "Баланс спонсорського пулу",
    statChallenges: "3 Активні",
    statChallengesLabel: "Доступні челенджі",
    statSpeed: "< 1 сек",
    statSpeedLabel: "Швидкість Solana",
    statDeposit: "0% Застави",
    statDepositLabel: "Пільга на лабораторне залізо",
    availableTasks: "Доступні завдання",
    selectToSolve: "Оберіть для виконання",
    workspaceTitle: "Робоча область",
    workspaceSubtitle: "Пісочниця оракула для верифікації тестів",
    runTests: "⚡ Надіслати та перевірити",
    runningTests: "Виконання тестів...",
    sandboxLabel: "Devnet Пісочниця",
    passedTitle: "Верифікацію пройдено! Всі тести виконано успішно.",
    statusOk: "СТАТУС: 200 OK",
    automatedPayout: "Автоматична виплата:",
    soulboundAttestation: "Soulbound підтвердження навичок:",
    cnftMinted: "cNFT викарбовано (Bubblegum)",
    walletNotice:
      "⚠️ Примітка: Підключіть свій Solana-гаманець у шапці сайту, щоб зафіксувати виплату на власну адресу.",
    connectWalletBanner:
      "⚡ Підключіть гаманець Phantom або Solflare (Devnet), щоб отримати винагороду.",
    alertConnect:
      "Будь ласка, спочатку підключіть гаманець Solana у правому верхньому кутку!",
    footer:
      "Ability Protocol © 2026 • Створено для IFK Colosseum Sprint 2026 та Colosseum Hackathon • ВСП «Ірпінський фаховий коледж НУБіП України»",
  },
};

export default function Home() {
  const { connected } = useWallet();
  const [lang, setLang] = useState<Language>("en");
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeI18n>(
    CHALLENGES[0]
  );
  const [code, setCode] = useState<string>(CHALLENGES[0].starterCode.en);
  const [status, setStatus] = useState<"idle" | "running" | "passed" | "failed">(
    "idle"
  );
  const [txSignature, setTxSignature] = useState<string | null>(null);

  // Load language preference if stored
  useEffect(() => {
    const saved = localStorage.getItem("ability_lang") as Language;
    if (saved === "en" || saved === "ua") {
      setLang(saved);
    }
  }, []);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("ability_lang", newLang);
    // update current starter code placeholder if user hasn't edited extensively
    setCode(selectedChallenge.starterCode[newLang]);
  };

  const handleSelectChallenge = (c: ChallengeI18n) => {
    setSelectedChallenge(c);
    setCode(c.starterCode[lang]);
    setStatus("idle");
    setTxSignature(null);
  };

  const handleRunTests = () => {
    if (!connected) {
      alert(TRANSLATIONS[lang].alertConnect);
      return;
    }

    setStatus("running");
    setTxSignature(null);

    // Simulate deterministic test runner execution and oracle release
    setTimeout(() => {
      setStatus("passed");
      setTxSignature(
        "5K2N...z9Qp" + Math.random().toString(36).substring(2, 8).toUpperCase()
      );
    }, 2000);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
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
                {t.network}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center rounded-xl bg-slate-800/80 p-0.5 border border-slate-700 text-xs font-semibold">
              <button
                onClick={() => switchLanguage("en")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === "en"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => switchLanguage("ua")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === "ua"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                🇺🇦 UA
              </button>
            </div>

            <div className="hidden md:flex items-center text-xs text-slate-400 gap-1 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              <span>{t.oracleStatus}</span>
            </div>

            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/70 to-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300">
              {t.badgeSprint}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.heroTitlePrefix}{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.heroDescription}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                {t.statVault}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {t.statVaultLabel}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-300 font-mono">
                {t.statChallenges}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {t.statChallengesLabel}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400 font-mono">
                {t.statSpeed}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {t.statSpeedLabel}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400 font-mono">
                {t.statDeposit}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {t.statDepositLabel}
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Workspace Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Challenge Selector */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center justify-between">
              <span>{t.availableTasks}</span>
              <span className="text-xs text-slate-400 font-normal">
                {t.selectToSolve}
              </span>
            </h2>

            <div className="space-y-3">
              {CHALLENGES.map((challenge) => {
                const isSelected = selectedChallenge.id === challenge.id;
                return (
                  <div
                    key={challenge.id}
                    onClick={() => handleSelectChallenge(challenge)}
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
                      <span className="text-slate-500">
                        {challenge.difficulty[lang]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Code Editor & Test Runner */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {t.workspaceTitle}
                </h2>
                <p className="text-xs text-slate-400">{t.workspaceSubtitle}</p>
              </div>

              <button
                onClick={handleRunTests}
                disabled={status === "running"}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg flex items-center gap-2 ${
                  status === "running"
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/20 active:scale-95"
                }`}
              >
                {status === "running" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    {t.runningTests}
                  </>
                ) : (
                  <>{t.runTests}</>
                )}
              </button>
            </div>

            {/* Code Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-slate-300">
                    {selectedChallenge.title[lang]}
                  </span>
                </div>
                <span>{t.sandboxLabel}</span>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                className="w-full bg-slate-950 p-4 font-mono text-xs sm:text-sm text-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-y leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Runner Feedback & Result */}
            {status === "passed" && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    {t.passedTitle}
                  </div>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                    {t.statusOk}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3">
                    <div className="text-slate-400">{t.automatedPayout}</div>
                    <div className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
                      +{selectedChallenge.bounty} {selectedChallenge.token}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 font-mono break-all">
                      Tx: {txSignature}
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3">
                    <div className="text-slate-400">
                      {t.soulboundAttestation}
                    </div>
                    <div className="font-mono text-teal-300 font-bold text-sm mt-0.5">
                      {t.cnftMinted}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {selectedChallenge.labReward[lang]}
                    </div>
                  </div>
                </div>

                {!connected && (
                  <p className="text-xs text-amber-300/90 pt-1">
                    {t.walletNotice}
                  </p>
                )}
              </div>
            )}

            {!connected && (
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 text-xs text-slate-400 flex items-center justify-between">
                <span>{t.connectWalletBanner}</span>
                <WalletButton />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        {t.footer}
      </footer>
    </div>
  );
}
