import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  _: NextRequest,
  { params }: { params: { limit: string } }
) {
  try {
    const result = await sql`
      SELECT *
      FROM products
      WHERE isActive = TRUE AND createdat >= CURRENT_TIMESTAMP - INTERVAL '3000 days'
      ORDER BY createdat DESC
      LIMIT ${Number(params.limit)};
    `;
    const rows = result.rows;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
