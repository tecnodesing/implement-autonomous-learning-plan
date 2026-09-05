import { NextResponse } from "next/server";
import { CURRICULUM } from "@/lib/curriculum";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ curriculum: CURRICULUM });
}
