import { getConfirmationEmailHtmlForPreview } from "@/lib/email";

export default function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page p-6 text-ink">
        <p>Cette page n&apos;existe qu&apos;en développement.</p>
      </div>
    );
  }

  const html = getConfirmationEmailHtmlForPreview("Camille Dupont");

  return (
    <div className="min-h-screen bg-neutral-800 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm text-neutral-300">
          Prévisualisation de l&apos;e-mail de confirmation (dev uniquement). Le
          bloc paiement Revolut s&apos;affiche si{" "}
          <code className="rounded bg-neutral-700 px-1.5 py-0.5 text-neutral-100">
            REVOLUT_PAYMENT_URL
          </code>{" "}
          est défini dans{" "}
          <code className="rounded bg-neutral-700 px-1.5 py-0.5 text-neutral-100">
            .env.local
          </code>
          .
        </p>
        <iframe
          title="Aperçu e-mail Ella"
          className="h-[min(90vh,900px)] w-full rounded-lg border border-neutral-600 bg-white shadow-lg"
          srcDoc={html}
        />
      </div>
    </div>
  );
}
