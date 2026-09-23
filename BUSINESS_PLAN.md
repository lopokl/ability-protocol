# Business Plan v1.0: Ability Protocol ⚡

> **On-chain skill verification and escrow system on Solana, connecting technical students with sponsor bounties and lab resources through practical challenges.**

[![Colosseum Hackathon](https://img.shields.io/badge/Colosseum-Hackathon%20Sprint-purple?style=for-the-badge)](https://colosseum.org/)
[![Telegram Mini App](https://img.shields.io/badge/Telegram-Mini%20App-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://telegram.org/)
[![Stage: Pre-MVP](https://img.shields.io/badge/Stage-Pre--MVP-orange?style=for-the-badge)](README.md)
[![Solana Devnet](https://img.shields.io/badge/Network-Solana%20Devnet-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com)
[![Technical Spec](https://img.shields.io/badge/Technical%20Spec-README.md-blue?style=for-the-badge)](README.md)

---

## 📑 Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Problem Statement](#2-problem-statement)
- [3. Target User Segments (ICP)](#3-target-user-segments-icp)
- [4. Competitive Landscape & Market Gaps](#4-competitive-landscape--market-gaps)
- [5. Solution & Core User Flow](#5-solution--core-user-flow)
- [6. Why Solana?](#6-why-solana)
- [7. Anti-Sybil & Anti-Cheating Architecture](#7-anti-sybil--anti-cheating-architecture)
- [8. Hardware & Lab Reputational Escrow Model](#8-hardware--lab-reputational-escrow-model)
- [9. Business & Monetization Model](#9-business--monetization-model)
- [10. Go-To-Market (GTM) Strategy](#10-go-to-market-gtm-strategy)
- [11. Technical Roadmap (Phase 1 MVP vs. Phase 2 Scale)](#11-technical-roadmap-phase-1-mvp-vs-phase-2-scale)
- [12. Demo Day MVP Scope & Success Metrics](#12-demo-day-mvp-scope--success-metrics)

---

## 1. Executive Summary

- **Project Name:** Ability Protocol
- **Tagline:** Turning practical engineering competence into liquid economic rewards and portable on-chain credentials.
- **Mission:** Democratize technical education by letting students fund their hardware and studies through verified engineering output, while giving sponsors fraud-proof hiring signals.
- **Stage:** Pre-MVP / IFK Colosseum Sprint 2026.
- **Target Audience:** Engineering college students, university tech labs, and Web3/tech sponsor companies.

---

## 2. Problem Statement

### 🎓 Academic Isolation (Students)
Engineering and CS students spend thousands of hours writing code, completing labs, and designing embedded systems. However, their achievements remain trapped inside closed university grading spreadsheets with zero verifiable cryptographic proof, no portable reputation, and zero immediate economic return. Concurrently, buying essential dev boards (ESP32, STM32, FPGA, Raspberry Pi) and measurement tools is cost-prohibitive for students in emerging markets.

### 💼 Verification & Hiring Noise (Sponsors & Tech Companies)
Junior tech hiring is plagued by extreme resume inflation and AI-generated quiz answers (ChatGPT/Claude). Sponsoring junior talent or filtering entry-level applicants costs companies $1,000–$3,000 per screened candidate, with zero guarantees that the candidate can solve practical tasks independently.

### 🔬 Trust Deficit & Resource Idle Time (College Labs)
University hardware labs and peer-to-peer equipment sharing face high friction: students cannot afford massive cash security deposits to borrow equipment, while labs lack transparent accountability mechanisms to prevent hardware damage and loss.

---

## 3. Target User Segments (ICP)

| User Segment | Profile | Primary Incentive |
| :--- | :--- | :--- |
| **Primary Users (Students)** | CS & engineering students (embedded, systems, backend, networking). | Earn micro-bounties ($5–$20) in USDC/SOL, build an immutable on-chain portfolio, unlock physical lab hardware. |
| **Secondary Users (Sponsors & Ecosystems)** | Web3 protocols, tech startups, developer grant funds, and devtools companies. | Cryptographically verified candidate screening, targeted developer onboarding, and zero-waste grant allocation. |
| **Institutional Partners (College Labs)** | Technical universities, colleges, and maker spaces. | Automated student skill tracking, zero-bureaucracy equipment lending, and higher hardware utilization. |

---

## 4. Competitive Landscape & Market Gaps

| Feature | Ability Protocol | Web3 Quests (Galxe, Zealy) | Certifications (Coursera, LinkedIn) | Freelance Platforms (Upwork) |
| :--- | :---: | :---: | :---: | :---: |
| **Verification Method** | Deterministic automated code & test runner execution | Social tasks (retweets, Discord joins) | Multiple-choice quizzes (easily spoofed by AI) | Manual client review |
| **Interface & Distribution** | Web App + Telegram Mini App (TMA) | Web only | Web only | Web & Mobile App |
| **Credential Type** | Soulbound Compressed NFT (cNFT) | Standard NFT / Off-chain XP points | Static PDF / LinkedIn badge | Reviews & star rating |
| **Economic Utility** | Instant micro-payouts + physical lab access | Token raffles / speculative airdrops | None (costs student money) | Variable hourly/milestone pay |
| **Target Audience** | Technical engineering students | Crypto speculators & bounty hunters | General public | Professional freelancers |
| **Transferable?** | ❌ No (Permanent proof of skill) | ⚠️ Often tradable on secondary | ❌ No (tied to account) | ❌ Non-portable |

---

## 5. Solution & Core User Flow

Ability Protocol connects real code execution with programmatic financial and physical rewards:

```
[ Sponsor deposits USDC/SOL Pool ] ──► [ Challenge Vault ]
                                               │
[ Student (Web / Telegram Mini App) ] ──► [ Test Runner Engine (Node.js) ]
                                               │ (Tests Pass)
                                      ┌────────┴────────┐
                                      ▼                 ▼
                         [ Instant Payout: USDC/SOL ]  [ Mint Soulbound cNFT ]
                                                        │
                                                        ▼
                                        [ Unlocks College Lab Hardware ]
```

1. **Sponsor Bounty Pool:** A sponsor deposits USDC or SOL into the protocol vault and defines task parameters and test suites.
2. **Task Execution:** A student launches the challenge via desktop browser or natively inside the **Telegram Mini App (TMA)** interface, connecting their mobile or desktop Solana wallet (Phantom, Solflare) and submitting their technical solution (scripts, algorithms, embedded code).
3. **Automated Verification:** The runner engine executes the test suite in a sandboxed environment.
4. **Programmatic Payout:** Upon test pass, the engine executes an on-chain transfer directly to the student’s wallet via `@solana/web3.js`.
5. **Soulbound Skill Attestation:** A non-transferable Metaplex Compressed NFT (cNFT) is minted to the student's address, permanently certifying mastery.
6. **Physical Lab Unlocking:** The student uses their cNFT as reputational collateral to borrow lab equipment with reduced or waived security deposits.

---

## 6. Why Solana?

- **Sub-Cent Micro-Settlements:** Micro-bounties ($5–$20) are economically unviable on Ethereum or L2s where gas fees consume significant percentages of the bounty. Solana enables sub-cent transaction costs.
- **Compressed NFTs (Metaplex Bubblegum):** Minting standard NFTs for hundreds of lab tasks would cost significant capital. With cNFT state compression, thousands of student badges cost fractions of a cent.
- **Sub-Second Finality:** Real-time verification ensures that the moment automated tests pass, the student receives their payout and badge within 1 second.

---

## 7. Anti-Sybil & Anti-Cheating Architecture

To prevent bounty drain from AI automation, script bots, and multi-wallet farming:

1. **Campus Domain Whitelisting:** Initial pilot tasks require verification of an institutional student email address (`.edu.ua` / college domain) linked to the wallet or Telegram user ID.
2. **Dynamic & Hidden Test Suites:** Challenge evaluation runs against randomised inputs and hidden test cases not exposed in the client UI.
3. **Execution Time & Rate Limiting:** Cooldown periods between challenge submissions per wallet prevent brute-force automated scraping.
4. **Tiered Payout Progression:**
   - *Tier 1 (Beginner):* Small bounties ($5) with daily limits.
   - *Tier 2 (Intermediate):* Unlocked only after holding at least two Tier 1 cNFT badges.
   - *Tier 3 (Advanced/Hardware):* Open only to vetted students with cumulative on-chain score.

---

## 8. Hardware & Lab Reputational Escrow Model

The primary innovation of Ability Protocol is **turning digital credentials into physical hardware access**:

- **Traditional Barrier:** A student must leave a $100–$200 deposit to take home an oscilloscope or high-end FPGA board.
- **Ability Protocol Reputational Collateral:**
  - Verified cNFT badges represent hours of authenticated engineering effort.
  - Labs adopt a **Hybrid Collateral Policy**: Holding specific verified cNFTs reduces the required cash deposit by 50% to 100%.
- **Default & Accountability:**
  - If equipment is not returned or is maliciously damaged, the lab marks the student's reputation on-chain.
  - Future bounty claims and lab privileges across partner facilities are automatically frozen.

---

## 9. Business & Monetization Model

Ability Protocol maintains a **100% free model for students**, generating revenue exclusively from enterprise partners, sponsors, and institutions:

| Revenue Stream | Model | Projected Pricing |
| :--- | :--- | :--- |
| **1. Protocol Escrow Fee** | 5%–8% platform fee on all sponsor bounty pools deposited into the vaults. | $25–$80 per $1,000 bounty pool |
| **2. B2B Talent Assessment Sprints** | Custom challenge tracks for Web3 ecosystems and tech firms looking to hire pre-screened interns. | $1,500–$3,500 per corporate sprint |
| **3. Direct Recruitment Fee** | Success fee paid by companies when hiring a student identified through high-tier cNFT leaderboard. | $500 flat fee per hired junior engineer |
| **4. Lab SaaS Management** | Pro-tier dashboard for educational institutions to manage lab inventory, loans, and student competency analytics. | $50–$100/month per university lab |

---

## 10. Go-To-Market (GTM) Strategy

### Phase 1: Hyper-Local Campus Pilot (Weeks 1–4)
- Partner directly with **Irpin Specialized College of NULES of Ukraine**.
- Onboard 30–50 engineering students in computer engineering and networking.
- Run the first micro-sprint funded by seed grant pool ($500 in micro-bounties).
- **Telegram Mini App (TMA) as Distribution Engine:** By adopting the TMA format, there is zero friction for student adoption. We do not require students to install third-party mobile apps or navigate complex onboarding portals. Challenge links are shared directly into college and lab Telegram groups, enabling 1-click onboarding right inside the messenger.

### Phase 2: Web3 Developer Community Integration (Months 2–4)
- Collaborate with **Superteam Ukraine** and Solana developer hubs.
- Launch sponsor bounties for Solana basics (Rust, Anchor syntax, Web3.js scripts).
- Showcase top student profiles directly to Ukrainian and European Web3 startups.

### Phase 3: Regional Inter-Collegiate Expansion (Months 5–8)
- Expand to 5 technical universities across Kyiv region and Western Ukraine.
- Establish standardized lab equipment borrowing agreements across partner universities.

---

## 11. Technical Roadmap (Phase 1 MVP vs. Phase 2 Scale)

To guarantee high shipping velocity during the hackathon sprint while ensuring a clear path to decentralization:

```
[ Phase 1: Colosseum MVP (Current) ]
├── Next.js Web Portal & Telegram Mini App (TMA)
├── Node.js Server & Sandboxed Test Runner / Oracle Service
├── Direct Devnet Transfers via @solana/web3.js (Backend Payer Vault)
└── Soulbound cNFT Minting via Metaplex Umi

                       │
                       ▼ Evolution
[ Phase 2: Decentralized Mainnet Scale ]
├── Anchor Framework Escrow Program (Rust on-chain vault)
├── Decentralized Oracle / Multi-sig Verification Proofs
├── Token Extensions (Transfer Hook / Non-transferable token standard)
└── University Lab Inventory Management Smart Contract
```

---

## 12. Demo Day MVP Scope & Success Metrics

### 🎯 MVP Scope (Colosseum Demo Day)
- [ ] **Sponsor Bounty Pool Setup:** Configured Devnet USDC / SOL balance vault.
- [ ] **Interactive Technical Challenge:** In-browser coding & logic task UI.
- [ ] **Telegram Mini App (TMA) Integration:** Responsive interface for seamless mobile/desktop access directly in Telegram.
- [ ] **Automated Verification:** Code & task solution verification engine.
- [ ] **Programmatic Bounty Payout:** Instant distribution via `@solana/web3.js` on Solana Devnet.
- [ ] **Soulbound Skill Minting:** Proof-of-Skill badge minting via Metaplex Bubblegum.
- [ ] **Lab Hardware Access Scenario:** Credential-gated equipment borrowing with reduced deposits.

### 📊 Sprint Target Metrics
- **End-to-End Speed:** Student solves task ➡️ gets payout + cNFT in < 30 seconds.
- **Pilot Feedback:** Validated with 5+ engineering students and 1 college laboratory manager.
- **Codebase Quality:** Full open-source repository with end-to-end instructions in [README.md](README.md).
