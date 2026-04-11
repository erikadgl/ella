import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ELLA",
  description:
    "Parenthèse de partage en Bretagne : Ayurveda, sonothérapie, nature et petit groupe (8 personnes). Presqu'île de Crozon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${mulish.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        <a href="#contenu-principal" className="skip-link">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
