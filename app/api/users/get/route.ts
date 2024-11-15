import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const id = Number((new URL(request.url)).searchParams.get('id'))
  try {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id}; 
    `;
    const rows = result?.rows;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
