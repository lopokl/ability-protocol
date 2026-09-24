import { NextRequest, NextResponse } from "next/server";
import { verifyAndProcessChallenge } from "@/services/solana";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { challengeId, code, studentWallet } = body;

    if (!challengeId || !code) {
      return NextResponse.json(
        { success: false, message: "Missing challengeId or code" },
        { status: 400 }
      );
    }

    const result = await verifyAndProcessChallenge(
      challengeId,
      code,
      studentWallet
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/verify error:", error);
    return NextResponse.json(
      { success: false, message: "Internal verification error" },
      { status: 500 }
    );
  }
}
