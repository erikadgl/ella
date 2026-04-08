import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import {
  sendConfirmationEmail,
  sendAdminNotification,
} from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Nom et email sont requis" },
      { status: 400 },
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO subscriptions (name, email, phone)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, phone || null],
    );

    const subscription = result.rows[0];

    await Promise.allSettled([
      sendConfirmationEmail(email, name),
      sendAdminNotification(name, email, phone),
    ]);

    return NextResponse.json({ subscription }, { status: 201 });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      "code" in err &&
      (err as { code: string }).code === "23505"
    ) {
      return NextResponse.json(
        { error: "Cet email est deja inscrit" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 },
    );
  }
}
