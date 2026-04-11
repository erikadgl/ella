"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Le week-end" },
  { href: "#facilitatrices", label: "À propos" },
];

/** Titres de section principaux (même taille, casse, interlettrage). */
const sectionTitleClass =
  "font-heading text-2xl font-semibold uppercase tracking-[0.18em] text-ink-strong dark:text-cream sm:text-3xl";

/** CTA barre de nav : contour couleur texte, fond transparent, hover inversé. */
const navCtaClass =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-ink-strong bg-transparent px-3.5 py-2 font-sans text-[14px] font-bold leading-none tracking-wide text-ink-strong transition-colors duration-200 hover:bg-ink-strong hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-ink-on-cream dark:focus-visible:ring-mint/40 dark:focus-visible:ring-offset-page sm:px-5 sm:py-2.5";

/** CTA formulaire : même logique (coins arrondis conservés). */
const primaryCtaClass =
  "inline-flex items-center justify-center rounded-xl border border-ink-strong bg-transparent px-6 py-3.5 font-sans text-sm font-bold tracking-wide text-ink-strong transition-colors duration-200 hover:bg-ink-strong hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-ink-on-cream dark:focus-visible:ring-mint/40 dark:focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-ink-strong dark:disabled:hover:bg-transparent dark:disabled:hover:text-cream";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value || null,
    };

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/confirmation");
    } else {
      const body = await res.json();
      setError(body.error || "Une erreur est survenue");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-ink-strong/10 bg-page/95 text-ink-strong backdrop-blur-md dark:border-cream/15 dark:bg-page/95 dark:text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="/"
            className="font-heading text-lg font-semibold tracking-[0.22em] sm:text-xl"
            aria-label="Ella, accueil"
          >
            ELLA
          </a>
          <nav
            className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-xs text-ink/80 sm:gap-x-4 sm:text-sm dark:text-cream/80"
            aria-label="Navigation principale"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 transition-colors hover:text-brand dark:hover:text-brand"
              >
                {item.label}
              </a>
            ))}
            <a href="#inscription" className={navCtaClass}>
              Réserver ma place
            </a>
          </nav>
        </div>
      </header>

      {/* Hero : split crème + image (maquette PDF) + accents dégradés & CTA (version précédente) */}
      <section
        className="relative overflow-hidden border-b border-ink-strong/10 dark:border-cream/10"
        aria-labelledby="titre-principal"
      >
        <div className="grid lg:min-h-[min(85vh,680px)] lg:grid-cols-2">
          <div className="relative flex flex-col justify-between gap-12 bg-page px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 25%, #EAA821 0%, transparent 45%), radial-gradient(circle at 85% 60%, #B3D3CD 0%, transparent 40%), radial-gradient(circle at 50% 100%, #D6DDAF 0%, transparent 42%)",
              }}
              aria-hidden
            />
            <div className="relative max-w-xl">
              <h1
                id="titre-principal"
                className="font-heading text-3xl font-semibold leading-[1.1] tracking-tight text-ink-strong dark:text-cream sm:text-4xl md:text-[2.75rem]"
              >
                <span className="block uppercase tracking-[0.12em]">
                  Week-end
                </span>
                <span className="mt-2 block uppercase tracking-[0.1em]">
                  Ayurveda &amp;
                </span>
                <span className="mt-2 block uppercase tracking-[0.1em]">
                  Sonothérapie
                </span>
              </h1>
              <p className="mt-8 text-base text-ink/85 dark:text-cream/80 sm:text-lg">
                9 – 11 octobre 2026 · Bretagne, presqu&apos;île de Crozon
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink dark:text-cream/90 sm:text-lg">
                Deux jours et demi pour revenir à l&apos;essentiel : le corps, le
                souffle, les sensations et le lien en petit groupe, au cœur de la
                nature.
              </p>
            </div>
            <div className="relative font-heading text-2xl font-medium leading-snug tracking-wide text-ink-strong dark:text-cream sm:text-3xl">
              <p>Ralentir.</p>
              <p className="mt-2">Ressentir.</p>
              <p className="mt-2">Se reconnecter.</p>
            </div>
          </div>
          <div className="relative hidden min-h-0 w-full lg:block lg:min-h-full">
            <Image
              src="/images/hero-fenetre-bols.png"
              alt="Bols chantants face à la mer, cadre du séjour"
              fill
              priority
              quality={78}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 0px, 50vw"
            />
          </div>
        </div>
      </section>

      <main
        id="contenu-principal"
        className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-8"
      >
        <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Dates", v: "9 – 11 oct. 2026" },
            { k: "Lieu", v: "Crozon, Finistère" },
            { k: "Groupe", v: "8 participants max." },
            { k: "Tarif", v: "350 €*" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-2xl border border-ink-strong/10 bg-card p-5 text-center dark:border-cream/10"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-strong/70 dark:text-cream/65">
                {item.k}
              </p>
              <p className="mt-2 font-heading text-lg font-medium text-ink-strong dark:text-cream">
                {item.v}
              </p>
            </div>
          ))}
        </div>
        <p className="-mt-12 mb-16 text-center text-xs text-ink/70 dark:text-cream/60">
          *Hébergement, repas et ateliers inclus — transport non inclus.
        </p>

        <section
          id="experience"
          className="mb-20 scroll-mt-24 rounded-3xl border border-ink-strong/10 bg-page px-6 py-10 dark:border-cream/10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
          aria-labelledby="titre-experience"
        >
          <h2 id="titre-experience" className={sectionTitleClass}>
            Expérience immersive
          </h2>
          <ul className="mt-6 flex list-none flex-wrap gap-3 p-0">
            {["Ateliers", "Nature", "Musique", "Partage"].map((label) => (
              <li key={label}>
                <span className="inline-block rounded-full bg-sage/60 px-4 py-1.5 text-sm font-medium text-ink-strong dark:bg-sage dark:text-cream">
                  {label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-7">
              <div className="space-y-5 text-lg leading-relaxed text-ink dark:text-cream/90">
                <p>
                  Pendant deux jours et demi, nous créons un véritable espace pour
                  revenir à l&apos;essentiel : le corps, le souffle, les sensations et le
                  lien.
                </p>
                <p>
                  Ce week-end se veut une parenthèse de partage, mêlant Ayurveda
                  (médecine indienne ancestrale), sonothérapie, mouvement et
                  créativité, au cœur de la nature. Nous vous proposons une
                  expérience immersive combinant :
                </p>
              </div>
              <ul className="mt-8 space-y-4 text-lg text-ink dark:text-cream/90">
                {[
                  "La découverte de l’Ayurveda (doshas, digestion, routines, saisonnalité)",
                  "La sonothérapie et l’exploration vibratoire",
                  "Le mouvement du corps",
                  "Des repas colorés et savoureux",
                  "Des moments pour soi, d’intégration et de partage",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
                  <Image
                    src="/images/bol-sonore.jpg"
                    alt="Bol tibétain et pratique sonore"
                    fill
                    quality={65}
                    className="object-cover"
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 280px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
                  <Image
                    src="/images/ingredients-ayurveda.png"
                    alt="Ingrédients colorés et cuisine ayurvédique"
                    fill
                    quality={65}
                    className="object-cover"
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 280px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
                  <Image
                    src="/images/herbes-paysage.png"
                    alt="Nature et végétation"
                    fill
                    quality={65}
                    className="object-cover"
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 280px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
                  <Image
                    src="/images/femme-meditation.jpg"
                    alt="Moment de calme et méditation"
                    fill
                    quality={65}
                    className="object-cover"
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 280px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="lieu"
          className="mb-20 scroll-mt-24 rounded-3xl border border-ink-strong/10 bg-gradient-to-br from-card via-page to-sage/35 p-8 dark:border-cream/10 dark:from-card dark:via-page dark:to-mint/25 sm:p-10"
          aria-labelledby="titre-lieu"
        >
          <h2 id="titre-lieu" className={sectionTitleClass}>
            Le lieu
          </h2>
          <p className="mt-2 text-lg font-medium text-ink-strong dark:text-[#B3D3CD]">
            En Bretagne, à la presqu&apos;île de Crozon
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
              <Image
                src="/images/maison-crozon-lieu-accueil.jpg"
                alt="Maison, lieu d&apos;accueil à Crozon"
                fill
                quality={68}
                className="object-cover object-center"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 31vw, 360px"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
              <Image
                src="/images/herbes-paysage.png"
                alt="Détail végétal, ambiance nature"
                fill
                quality={68}
                className="object-cover object-center"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 31vw, 360px"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
              <Image
                src="/images/lieu-hebergement.avif"
                alt="Vue du domaine : terrasse et piscine"
                fill
                quality={68}
                className="object-cover object-center"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 31vw, 360px"
              />
            </div>
          </div>
          <div className="mt-8 space-y-6 leading-relaxed text-ink dark:text-cream/85">
            <p>
              <strong className="text-ink-strong dark:text-cream">
                Comment s&apos;y rendre ?
              </strong>
            </p>
            <p>
              <strong>En train</strong> — l&apos;option la plus confortable : Paris-Montparnasse
              → Brest en TGV (environ 4 h), puis navette ou covoiturage jusqu&apos;à
              Crozon (~45 min). En réservant environ deux mois à l&apos;avance,
              comptez 40 à 60 € l&apos;aller.
            </p>
            <p>
              <strong>En voiture</strong> — depuis Paris, environ 6 h ; idéal pour organiser un
              covoiturage entre participants — une belle façon de commencer le
              week-end ensemble.
            </p>
            <p className="rounded-xl bg-sage/60 p-4 text-sm text-ink-strong dark:bg-sage dark:text-cream">
              Les détails pratiques vous seront communiqués après inscription.
            </p>
          </div>
        </section>

        <section
          id="format"
          className="mb-20 scroll-mt-24 rounded-3xl border border-ink-strong/10 bg-page px-6 py-10 dark:border-cream/10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
          aria-labelledby="titre-format"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <h2 id="titre-format" className={sectionTitleClass}>
                Le format
              </h2>
              <p className="mt-6 font-heading text-xl font-semibold text-ink-strong dark:text-cream sm:text-2xl">
                350 € par personne
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink dark:text-cream/90">
                <strong className="text-ink-strong dark:text-cream">
                  2 jours et demi
                </strong>{" "}
                en petit groupe de{" "}
                <strong className="text-ink-strong dark:text-cream">
                  8 participants
                </strong>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-ink-strong dark:text-cream">
                <span className="rounded-lg bg-sage/60 px-4 py-2 text-sm dark:bg-sage">
                  Arrivée le vendredi 9 octobre
                </span>
                <span className="rounded-lg bg-sage/60 px-4 py-2 text-sm dark:bg-sage">
                  Départ le dimanche 11 octobre 2026
                </span>
              </div>
              <div className="mt-10">
                <h3 className="font-heading text-lg font-semibold text-ink-strong dark:text-cream">
                  Ce qui est inclus :
                </h3>
                <ul className="mt-4 list-inside list-disc space-y-2 text-lg text-ink dark:text-cream/90">
                  <li>2 nuits à Crozon</li>
                  <li>Tous les repas (du vendredi soir au dimanche midi)</li>
                  <li>L&apos;ensemble des ateliers &amp; pratiques</li>
                  <li>Accès au hammam et à la piscine (non chauffée)</li>
                </ul>
                <p className="mt-6 text-sm text-ink/85 dark:text-cream/70">
                  Seul le transport reste à la charge des participants.
                </p>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
                  <Image
                    src="/images/format-chambre.avif"
                    alt="Chambre partagée, literie et bois clair"
                    fill
                    quality={68}
                    className="object-cover"
                    sizes="(max-width: 1024px) 92vw, min(520px, 45vw)"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
                  <Image
                    src="/images/format-sejour.avif"
                    alt="Espace de vie et séjour"
                    fill
                    quality={68}
                    className="object-cover"
                    sizes="(max-width: 640px) 44vw, (max-width: 1024px) 44vw, 260px"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-strong/10 shadow-sm dark:border-cream/10">
                  <Image
                    src="/images/format-hammam.jpeg"
                    alt="Hammam sur place"
                    fill
                    quality={68}
                    className="object-cover"
                    sizes="(max-width: 640px) 44vw, (max-width: 1024px) 44vw, 260px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="programme"
          className="mb-20 scroll-mt-24"
          aria-labelledby="titre-programme"
        >
          <h2 id="titre-programme" className={sectionTitleClass}>
            Le programme
          </h2>
          <div className="relative mt-6 h-44 w-full overflow-hidden rounded-2xl border border-ink-strong/10 bg-ink-strong/5 dark:border-cream/10 sm:h-52">
            <Image
              src="/images/ingredients.jpg"
              alt="Repas partagés et saveurs du séjour"
              fill
              quality={65}
              className="min-h-full min-w-full scale-[1.22] object-cover object-center sm:scale-[1.18]"
              sizes="(max-width: 640px) 92vw, min(1152px, 85vw)"
            />
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <ProgrammeDay
              title="Vendredi"
              date="9 octobre"
              items={[
                "Accueil & repas partagé",
                "Présentation du week-end",
                "Bain sonore d'ouverture",
              ]}
            />
            <ProgrammeDay
              title="Samedi"
              date="10 octobre"
              items={[
                "Yoga & pranayama au réveil",
                "Petit-déjeuner ayurvédique",
                "Atelier ayurveda : découverte des doshas",
                "Déjeuner",
                "Randonnée sur la presqu'île",
                "Bain froid en mer (optionnel)",
                "Temps libre",
                "Dîner",
                "Méditation et grand bain sonore",
                "Cercle de partage",
              ]}
            />
            <ProgrammeDay
              title="Dimanche"
              date="11 octobre"
              items={[
                "Mouvement doux au réveil",
                "Petit-déjeuner",
                "Atelier ayurveda : routines & outils du quotidien",
                "Déjeuner de clôture",
                "Cercle de fin & départs",
              ]}
            />
          </div>
        </section>

        <section
          id="facilitatrices"
          className="mb-20 scroll-mt-24 rounded-3xl border border-ink-strong/10 bg-page px-6 py-10 dark:border-cream/10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
          aria-labelledby="titre-facilitatrices"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="titre-facilitatrices" className={sectionTitleClass}>
                Erika &amp; Astrid
              </h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-ink dark:text-cream/90 sm:text-lg">
                <p>
                  Nous sommes deux amies, rencontrées à Amsterdam il y a cinq ans.
                  À l&apos;époque collègues, nous avons très vite senti que nous avions
                  envie de continuer à travailler ensemble, mais sur un projet qui
                  ait davantage de sens pour nous.
                </p>
                <p>
                  Chacune explore à sa manière le lien entre le corps, l&apos;énergie
                  et l&apos;équilibre intérieur.
                </p>
                <p>
                  Pour Astrid, cela s&apos;est traduit par une immersion profonde dans
                  l&apos;Ayurveda, avec l&apos;envie de comprendre le fonctionnement du corps
                  et d&apos;intégrer des pratiques simples et concrètes au quotidien.
                </p>
                <p>
                  Pour Erika, cette exploration passe par le mouvement, le sport, le
                  chant, la musique et le dessin. Le corps est son terrain
                  d&apos;expression, la vibration son langage. La sonothérapie est venue
                  naturellement enrichir cette approche.
                </p>
                <p>
                  Notre voyage en Inde a marqué une étape importante. Pour l&apos;une,
                  c&apos;était découvrir l&apos;Ayurveda avec un regard neuf ; pour l&apos;autre,
                  approfondir une pratique déjà ancrée. Mais surtout, c&apos;était du
                  temps ensemble, pour ralentir, partager, expérimenter et imaginer
                  un projet qui nous ressemble vraiment.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-ink-strong/10 bg-ink-strong/5 shadow-sm dark:border-cream/10 lg:mx-0 lg:max-w-none lg:aspect-auto lg:min-h-[min(100%,520px)] lg:h-full">
                <Image
                  src="/images/erika-astrid.jpg"
                  alt="Erika et Astrid en posture de yoga sur un sommet rocheux, vallée verdoyante"
                  fill
                  quality={72}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) min(448px, 92vw), min(420px, 40vw)"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mb-16 scroll-mt-24 text-center"
          aria-labelledby="titre-contact"
        >
          <h2
            id="titre-contact"
            className="text-lg font-semibold text-ink-strong dark:text-cream"
          >
            Une question avant de vous inscrire ?
          </h2>
          <p className="mt-3 text-sm text-ink/85 dark:text-cream/70">
            <a
              href="mailto:contact@ella-ayurveda.com"
              className="text-ink-strong underline decoration-brand/50 underline-offset-4 transition hover:text-brand dark:text-[#B3D3CD] dark:hover:text-brand"
            >
              <span className="sr-only">Nous écrire à </span>
              contact@ella-ayurveda.com
            </a>
          </p>
        </section>

        <section
          id="inscription"
          className="scroll-mt-24"
          aria-labelledby="titre-inscription"
        >
          <div className="rounded-3xl border border-brand/35 bg-gradient-to-br from-sage/40 via-page to-card p-8 shadow-md dark:border-brand/30 dark:from-sage/25 dark:via-page dark:to-card sm:p-10">
            <h2 id="titre-inscription" className={sectionTitleClass}>
              Inscription
            </h2>
            <p className="mt-3 text-ink/90 dark:text-cream/75">
              Laissez-nous vos coordonnées : nous vous enverrons les informations
              de paiement par email. Un acompte de{" "}
              <strong className="text-ink-strong dark:text-cream">75&nbsp;€</strong>{" "}
              est demandé pour confirmer votre inscription.
            </p>

            {error && (
              <div
                id="erreur-inscription"
                className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
              aria-describedby={error ? "erreur-inscription" : undefined}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-ink-strong dark:text-cream"
                >
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-ink-strong/15 bg-card px-4 py-3 font-sans text-sm text-ink-strong focus:outline-none focus:ring-2 focus:ring-brand dark:border-cream/15 dark:bg-card dark:text-cream"
                  placeholder="Prénom Nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-ink-strong dark:text-cream"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-ink-strong/15 bg-card px-4 py-3 font-sans text-sm text-ink-strong focus:outline-none focus:ring-2 focus:ring-brand dark:border-cream/15 dark:bg-card dark:text-cream"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-ink-strong dark:text-cream"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-xl border border-ink-strong/15 bg-card px-4 py-3 font-sans text-sm text-ink-strong focus:outline-none focus:ring-2 focus:ring-brand dark:border-cream/15 dark:bg-card dark:text-cream"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-1 ${primaryCtaClass}`}
                aria-busy={loading}
              >
                {loading
                  ? "Envoi en cours…"
                  : "Envoyer ma demande"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-strong/10 bg-sage/35 py-10 text-center text-sm text-ink dark:border-cream/15 dark:bg-sage dark:text-cream/85">
        <p className="font-medium text-ink-strong dark:text-cream/95">
          Week-end Ayurveda &amp; Sonothérapie · 9 – 11 octobre 2026
        </p>
        <p className="mt-6 text-xs opacity-80">
          &copy; {new Date().getFullYear()} · Tous droits réservés
        </p>
      </footer>
    </div>
  );
}

function ProgrammeDay({
  title,
  date,
  items,
}: {
  title: string;
  date: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-ink-strong/10 bg-card p-6 dark:border-cream/10">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
        {title}
      </p>
      <p className="mt-1 font-heading text-lg font-semibold text-ink-strong dark:text-cream">
        {date}
      </p>
      <ul className="mt-5 space-y-2.5 text-sm leading-snug text-ink dark:text-cream/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
