import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import {
  sendConfirmationEmail,
  sendAdminNotification,
} from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
  }

  const { name, email, phone } = body as {
    name?: string;
    email?: string;
    phone?: string | null;
  };

  if (!name || !email) {
    return NextResponse.json(
      { error: "Nom et email sont requis" },
      { status: 400 },
    );
  }

  const phoneValue = phone ?? null;

  try {
    const result = await pool.query(
      `INSERT INTO subscriptions (name, email, phone)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, phoneValue],
    );

    const subscription = result.rows[0];

    await Promise.allSettled([
      sendConfirmationEmail(email, name),
      sendAdminNotification(name, email, phoneValue),
    ]);

    return NextResponse.json({ subscription }, { status: 201 });
  } catch (err: unknown) {
    const code =
      err &&
      typeof err === "object" &&
      "code" in err &&
      typeof (err as { code?: unknown }).code === "string"
        ? (err as { code: string }).code
        : undefined;

    if (code === "23505") {
      return NextResponse.json(
        { error: "Cet email est déjà inscrit." },
        { status: 409 },
      );
    }

    // Visible dans les logs Vercel pour diagnostiquer rapidement la prod.
    console.error("[subscribe] failed", {
      message: err instanceof Error ? err.message : String(err),
      code,
    });

    if (code === "42P01") {
      return NextResponse.json(
        { error: "Base de données non initialisée (table manquante)." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 },
    );
  }
}
