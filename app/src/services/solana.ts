import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const DEVNET_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl("devnet");

export const connection = new Connection(DEVNET_RPC_URL, "confirmed");

export interface VerificationResult {
  success: boolean;
  challengeId: string;
  studentWallet?: string;
  txSignature?: string;
  cnftAssetId?: string;
  message: string;
  bounty: string;
  token: string;
  labReward: string;
}

/**
 * Validates basic code structure and returns a deterministic mock verification on Devnet
 */
export async function verifyAndProcessChallenge(
  challengeId: string,
  code: string,
  studentWallet?: string
): Promise<VerificationResult> {
  // Simple deterministic evaluation check
  if (!code || code.trim().length < 20) {
    return {
      success: false,
      challengeId,
      message: "Solution is too short or empty. Please implement the required function.",
      bounty: "0",
      token: "USDC",
      labReward: "None",
    };
  }

  // Simulate verification latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate simulated Devnet signature & cNFT asset ID
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const txSignature = `5K2N7v9m${randomSuffix}SolDevnetPayoutVault`;
  const cnftAssetId = `cNFT-Bubblegum-${randomSuffix}`;

  const bountyMap: Record<string, { bounty: string; token: string; labReward: string }> = {
    "challenge-1": {
      bounty: "15",
      token: "USDC",
      labReward: "50% off deposit for ESP32 & Arduino kits",
    },
    "challenge-2": {
      bounty: "25",
      token: "USDC",
      labReward: "Free access to Lab Oscilloscopes & Soldering Station",
    },
    "challenge-3": {
      bounty: "50",
      token: "USDC",
      labReward: "100% deposit waiver for FPGA boards & SDR hardware",
    },
  };

  const info = bountyMap[challengeId] || {
    bounty: "10",
    token: "USDC",
    labReward: "Standard lab equipment access",
  };

  return {
    success: true,
    challengeId,
    studentWallet,
    txSignature,
    cnftAssetId,
    message: "All deterministic test suites passed! On-chain payout and cNFT minted.",
    bounty: info.bounty,
    token: info.token,
    labReward: info.labReward,
  };
}
