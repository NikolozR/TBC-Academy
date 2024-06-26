import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;
  try {
    const res = await sql`DELETE From cart WHERE user_id = ${Number(userId)};`;
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
