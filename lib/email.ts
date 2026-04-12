import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/** En production : domaine verifie dans Resend, ex. Ella <inscription@votredomaine.com> */
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Ella <onboarding@resend.dev>";

async function sendOrLog(
  payload: Parameters<typeof resend.emails.send>[0],
  label: string,
) {
  const { error } = await resend.emails.send(payload);
  if (error) {
    console.error(`[email] ${label} failed:`, error);
  }
}

export async function sendConfirmationEmail(
  to: string,
  name: string,
) {
  await sendOrLog(
    {
      from: FROM_EMAIL,
      to,
      subject: "Inscription confirmee - Informations de paiement",
      html: `
      <h1>Bonjour ${name},</h1>
      <p>Merci pour votre inscription ! Votre demande a bien ete enregistree.</p>
      <h2>Informations pour l'acompte</h2>
      <p>Pour finaliser votre inscription, veuillez effectuer un acompte selon les modalites suivantes :</p>
      <ul>
        <li><strong>Montant de l&apos;acompte :</strong> 100&nbsp;&euro;</li>
        <li><strong>Mode de paiement :</strong> Virement bancaire</li>
        <li><strong>Reference :</strong> ELLA-${name.toUpperCase().replace(/\s/g, "")}</li>
      </ul>
      <p>Toute annulation avant le 31 aout 2026 est remboursee integralement.</p>
      <p>Vous recevrez un email de confirmation des que votre paiement aura ete traite.</p>
      <p>A bientot !</p>
    `,
    },
    "confirmation",
  );
}

export async function sendStatusChangeEmail(
  to: string,
  name: string,
  status: string,
) {
  const statusMessages: Record<string, { subject: string; body: string }> = {
    paid: {
      subject: "Paiement confirme",
      body: `<p>Votre paiement a ete confirme. Votre inscription est maintenant complete.</p>
             <p>Nous avons hate de vous voir !</p>`,
    },
    cancelled: {
      subject: "Inscription annulee",
      body: `<p>Votre inscription a ete annulee.</p>
             <p>Si vous pensez qu'il s'agit d'une erreur, n'hesitez pas a nous contacter.</p>`,
    },
  };

  const message = statusMessages[status];
  if (!message) return;

  await sendOrLog(
    {
      from: FROM_EMAIL,
      to,
      subject: message.subject,
      html: `
      <h1>Bonjour ${name},</h1>
      ${message.body}
    `,
    },
    "status-change",
  );
}

/** Notification a l'organisateur : nouvelle inscription (destinataire = ADMIN_EMAIL). */
export async function sendAdminNotification(
  name: string,
  email: string,
  phone: string | null,
) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await sendOrLog(
    {
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `Nouvelle inscription : ${name}`,
      html: `
      <h1>Nouvelle inscription</h1>
      <ul>
        <li><strong>Nom :</strong> ${name}</li>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Telephone :</strong> ${phone || "Non renseigne"}</li>
      </ul>
    `,
    },
    "admin-notification",
  );
}
