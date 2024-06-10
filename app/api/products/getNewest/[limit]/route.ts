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
FROM your_table_name
WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '10 days'
ORDER BY created_at DESC
LIMIT ${Number(params.limit)};
    `;
    const rows = result.rows;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
