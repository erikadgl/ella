import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { sendStatusChangeEmail } from "@/lib/email";

export async function GET() {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const result = await pool.query(
    "SELECT * FROM subscriptions ORDER BY created_at DESC",
  );

  return NextResponse.json({ subscriptions: result.rows });
}

export async function PATCH(request: Request) {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id, status, notes } = await request.json();

  if (!id || !status) {
    return NextResponse.json(
      { error: "ID et statut requis" },
      { status: 400 },
    );
  }

  const validStatuses = ["pending", "paid", "cancelled"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Statut invalide" },
      { status: 400 },
    );
  }

  let result;
  if (notes !== undefined) {
    result = await pool.query(
      "UPDATE subscriptions SET status = $1, notes = $2 WHERE id = $3 RETURNING *",
      [status, notes, id],
    );
  } else {
    result = await pool.query(
      "UPDATE subscriptions SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );
  }

  const subscription = result.rows[0];
  if (!subscription) {
    return NextResponse.json(
      { error: "Inscription non trouvee" },
      { status: 404 },
    );
  }

  if (status !== "pending") {
    await sendStatusChangeEmail(subscription.email, subscription.name, status);
  }

  return NextResponse.json({ subscription });
}
