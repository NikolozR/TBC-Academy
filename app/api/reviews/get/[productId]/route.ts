import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  _: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    const res = await sql`
      SELECT reviews.*, users.*
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      WHERE reviews.product_id = ${Number(productId)};
    `;
    const rows = res.rows;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
