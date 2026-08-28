import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adriarotenburg.de"),

  title: "Restaurant Adria Rotenburg",

  description:
    "Restaurant Adria in Rotenburg (Wümme) – Balkan- und internationale Küche, Grillgerichte und saisonale Spezialitäten.",

  openGraph: {
    title: "Restaurant Adria Rotenburg",
    description:
      "Balkan- und internationale Küche in Rotenburg (Wümme).",
    url: "https://www.adriarotenburg.de",
    siteName: "Restaurant Adria Rotenburg",
    locale: "de_DE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Restaurant Adria Rotenburg",
    description:
      "Balkan- und internationale Küche in Rotenburg (Wümme).",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}