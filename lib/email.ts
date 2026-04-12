import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/** En production : domaine verifie dans Resend, ex. Ella <inscription@votredomaine.com> */
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Ella <onboarding@resend.dev>";

const BRAND = "#eaa821";
const INK = "#403e3e";
const INK_STRONG = "#232323";
const PAGE = "#f7f6ed";
const CARD = "#ffffff";
const MINT = "#b3d3cd";
const CONTACT = "contact@ella-ayurveda.com";

const FONT_STACK =
  "system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildConfirmationHtml(name: string): string {
  const safe = escapeHtml(name);
  const paymentUrl = process.env.REVOLUT_PAYMENT_URL?.trim();

  const paymentBlock = paymentUrl
    ? `
      <p style="margin:0 0 16px;color:${INK};font-size:16px;line-height:1.65;">
        Pour confirmer votre participation, nous vous invitons &agrave; effectuer un acompte de <strong style="color:${INK_STRONG};">100&nbsp;&euro;</strong> via le lien ci-dessous&nbsp;:
      </p>
      <p style="margin:0 0 24px;">
        <span aria-hidden="true" style="font-size:18px;">&#128073;</span>
        <a href="${escapeHtml(paymentUrl)}" style="display:inline-block;margin-left:6px;padding:14px 28px;background:${BRAND};color:${INK_STRONG};text-decoration:none;font-weight:700;font-size:15px;border-radius:9999px;border:1px solid #c98f18;">
          Payer l&apos;acompte (Revolut)
        </a>
      </p>
      <p style="margin:0 0 20px;font-size:14px;line-height:1.5;color:${INK};">
        Ou copiez ce lien dans votre navigateur&nbsp;:<br />
        <a href="${escapeHtml(paymentUrl)}" style="color:${INK_STRONG};word-break:break-all;">${escapeHtml(paymentUrl)}</a>
      </p>`
    : `
      <p style="margin:0 0 20px;color:${INK};font-size:16px;line-height:1.65;">
        Pour confirmer votre participation, nous vous invitons &agrave; effectuer un acompte de <strong style="color:${INK_STRONG};">100&nbsp;&euro;</strong>.
        Le lien de paiement (Revolut) vous sera communiqu&eacute; dans un prochain message ou sur simple demande &agrave;
        <a href="mailto:${CONTACT}" style="color:${INK_STRONG};font-weight:600;">${CONTACT}</a>.
      </p>`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ella</title>
</head>
<body style="margin:0;padding:0;background-color:${PAGE};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PAGE};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${CARD};border-radius:16px;border:1px solid #e8e6dc;overflow:hidden;">
          <tr>
            <td style="height:5px;background:${BRAND};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 26px 8px;font-family:${FONT_STACK};">
              <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${INK_STRONG};font-weight:700;">ELLA</p>
              <p style="margin:6px 0 0;font-size:12px;color:${INK};opacity:0.85;">Ayurveda &amp; Sonoth&eacute;rapie</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 26px 28px;font-family:${FONT_STACK};color:${INK};font-size:16px;line-height:1.65;">
              <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:${INK_STRONG};font-weight:600;">
                Bonjour ${safe},
              </h1>
              <p style="margin:0 0 16px;">
                Merci pour votre inscription au week-end <strong style="color:${INK_STRONG};">Ayurveda &amp; Sonoth&eacute;rapie</strong>, nous sommes ravies de vous accueillir.
              </p>
              <p style="margin:0 0 24px;">
                Votre demande a bien &eacute;t&eacute; enregistr&eacute;e.
              </p>
              ${paymentBlock}
              <p style="margin:0 0 8px;font-size:15px;color:${INK_STRONG};font-weight:600;">
                Merci d&apos;indiquer la r&eacute;f&eacute;rence suivante lors du paiement&nbsp;:
              </p>
              <p style="margin:0 0 24px;padding:14px 16px;background:${PAGE};border-radius:10px;border-left:4px solid ${MINT};color:${INK_STRONG};font-size:15px;">
                ${safe} &ndash; Ella Ayurveda
              </p>
              <p style="margin:0 0 20px;">
                Toute annulation effectu&eacute;e avant le <strong>31 ao&ucirc;t 2026</strong> sera int&eacute;gralement rembours&eacute;e.
              </p>
              <p style="margin:0 0 20px;">
                D&egrave;s r&eacute;ception de votre paiement, vous recevrez un email de confirmation ainsi que les informations pratiques pour le s&eacute;jour, dont l&apos;acc&egrave;s au groupe WhatsApp.
              </p>
              <p style="margin:0 0 8px;">
                Pour toute question, n&apos;h&eacute;sitez pas &agrave; nous contacter &agrave; l&apos;adresse suivante&nbsp;:
              </p>
              <p style="margin:0 0 28px;">
                <a href="mailto:${CONTACT}" style="color:${INK_STRONG};font-weight:600;text-decoration:underline;text-decoration-color:${BRAND};">${CONTACT}</a>
              </p>
              <p style="margin:0 0 4px;">&Agrave; tr&egrave;s bient&ocirc;t,</p>
              <p style="margin:0;font-weight:600;color:${INK_STRONG};">Astrid &amp; Erika</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;max-width:560px;font-family:${FONT_STACK};font-size:12px;color:${INK};opacity:0.75;text-align:center;line-height:1.5;">
          Week-end du 9 au 11 octobre 2026 &middot; Presqu&apos;&icirc;le de Crozon
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Aperçu du HTML (ex. page `/dev/email-preview` en local). */
export function getConfirmationEmailHtmlForPreview(
  name = "Camille Dupont",
): string {
  return buildConfirmationHtml(name);
}

async function sendOrLog(
  payload: Parameters<typeof resend.emails.send>[0],
  label: string,
) {
  const { error } = await resend.emails.send(payload);
  if (error) {
    console.error(`[email] ${label} failed:`, error);
  }
}

export async function sendConfirmationEmail(to: string, name: string) {
  await sendOrLog(
    {
      from: FROM_EMAIL,
      to,
      subject:
        "Ella — Week-end Ayurveda & Sonothérapie : votre demande et l'acompte",
      html: buildConfirmationHtml(name),
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
      subject: "Paiement confirmé — Ella",
      body: `<p>Votre paiement a été confirmé. Votre inscription est maintenant complète.</p>
             <p>Nous avons hâte de vous voir !</p>`,
    },
    cancelled: {
      subject: "Inscription annulée — Ella",
      body: `<p>Votre inscription a été annulée.</p>
             <p>Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à nous contacter à <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>`,
    },
  };

  const message = statusMessages[status];
  if (!message) return;

  const safe = escapeHtml(name);

  await sendOrLog(
    {
      from: FROM_EMAIL,
      to,
      subject: message.subject,
      html: `
      <div style="font-family:${FONT_STACK};color:${INK};font-size:16px;line-height:1.6;max-width:560px;">
        <h1 style="color:${INK_STRONG};font-size:20px;">Bonjour ${safe},</h1>
        ${message.body}
      </div>
    `,
    },
    "status-change",
  );
}

/** Notification à l'organisateur : nouvelle inscription (destinataire = ADMIN_EMAIL). */
export async function sendAdminNotification(
  name: string,
  email: string,
  phone: string | null,
) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  await sendOrLog(
    {
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `Nouvelle inscription : ${name}`,
      html: `
      <div style="font-family:${FONT_STACK};color:${INK};font-size:15px;line-height:1.5;">
        <h1 style="color:${INK_STRONG};font-size:18px;">Nouvelle inscription</h1>
        <ul style="padding-left:20px;">
          <li><strong>Nom :</strong> ${safeName}</li>
          <li><strong>Email :</strong> ${safeEmail}</li>
          <li><strong>Téléphone :</strong> ${phone ? escapeHtml(phone) : "Non renseigné"}</li>
        </ul>
      </div>
    `,
    },
    "admin-notification",
  );
}
