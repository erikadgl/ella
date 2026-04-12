import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <main
      id="contenu-principal"
      className="flex flex-1 items-center justify-center bg-page px-6"
    >
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint/40 dark:bg-mint/25">
          <svg
            className="h-8 w-8 text-ink-strong dark:text-[#B3D3CD]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="mb-3 font-heading text-2xl font-semibold text-ink-strong dark:text-cream">
          Demande d&apos;inscription envoyée !
        </h1>
        <p className="mb-4 text-ink/90 dark:text-cream/75">
          Merci : nous avons bien reçu votre demande d&apos;inscription. Un email
          de confirmation avec les modalités de paiement (acompte de{" "}
          100&nbsp;€) vous a été envoyé. Pensez à vérifier vos spams.
        </p>
        <p className="mb-6 text-ink/90 dark:text-cream/75">
          Pour toute question ou information complémentaire, écrivez à{" "}
          <a
            href="mailto:contact@ella-ayurveda.com"
            className="font-medium text-ink-strong underline decoration-brand/50 underline-offset-4 transition hover:text-brand dark:text-[#B3D3CD] dark:hover:text-brand"
          >
            contact@ella-ayurveda.com
          </a>
          .
        </p>
        <Link
          href="/"
          className="inline-block rounded-full border border-ink-strong bg-transparent px-6 py-2.5 font-sans text-sm font-bold text-ink-strong transition-colors duration-200 hover:bg-ink-strong hover:text-cream dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-ink-on-cream"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
