import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function PATCH(request: Request) {
  const { name, sub, surname, displayname }: UpdateUser = await request.json();
  try {
    await sql`
   UPDATE users
      SET name = ${name}, surname = ${surname}, displayName = ${displayname}
      WHERE sub = ${sub};
    `;
    return NextResponse.json(
      { message: "Information was updated succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
