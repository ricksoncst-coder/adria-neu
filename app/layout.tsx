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

    images: [
      {
        url: "/logo-whatsapp.png",
        width: 1200,
        height: 1200,
        alt: "Restaurant Adria Rotenburg – Balkan- und internationale Küche",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Restaurant Adria Rotenburg",
    description:
      "Balkan- und internationale Küche in Rotenburg (Wümme).",
    images: ["/logo-whatsapp.png"],
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restaurant Adria",
  url: "https://www.adriarotenburg.de",
  telephone: "+49 4261 82301",
  servesCuisine: ["Balkan", "Internationale Küche"],

  address: {
    "@type": "PostalAddress",
    streetAddress: "Am Markt 12",
    postalCode: "27356",
    addressLocality: "Rotenburg (Wümme)",
    addressCountry: "DE",
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:30",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "17:30",
      closes: "23:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}