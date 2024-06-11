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
WHERE createdat >= CURRENT_TIMESTAMP - INTERVAL '10 days'
ORDER BY createdat DESC
LIMIT ${Number(params.limit)};
    `;
    console.log(result);
    const rows = result.rows;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
