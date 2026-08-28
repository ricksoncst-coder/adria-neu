import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const menuSections = [
  {
    title: "Ein bisschen vorweg",
    items: [
      {
        name: "Hausgemachtes Zaziki",
        price: "5,50 €",
        description: "Mit Knoblauchbrot",
      },
      {
        name: "Mozzarella im Serranoschinken",
        price: "12,90 €",
        description:
          "Gegrillter Mozzarella im Serranomantel mit Röstbrot und Salatbeilage",
      },
      {
        name: "Gebackene Mozzarella-Bällchen",
        price: "11,90 €",
        description:
          "Knusprig panierte Mozzarella-Bällchen mit Knoblauchbrot und Salatbeilage",
      },
      {
        name: "Panierter Hirtenkäse",
        price: "9,90 €",
        description:
          "Knusprig panierter Hirtenkäse mit Röstbrot und Salatbeilage",
      },
    ],
  },
  {
    title: "Specials",
    items: [
      {
        name: "Blattsalat mit Knoblauch-Chili-Garnelen",
        price: "26,90 €",
        description:
          "Tomaten, Gurken, rote Zwiebeln, Paprika, Fregola Sarda, Kichererbsen, Parmesan und hausgemachte Balsamico-Vinaigrette",
      },
      {
        name: "Blattsalat mit gegrillten Pilzen",
        price: "18,90 €",
        description:
          "Halloumi-Grillkäse, Tomaten, Gurken, rote Zwiebeln, Paprika, Fregola, Kichererbsen und hausgemachte Balsamico-Vinaigrette",
      },
      {
        name: "Blattsalat mit gegrilltem Rumpsteak",
        price: "27,50 €",
        description:
          "Tomaten, Gurken, rote Zwiebeln, Paprika, Fregola Sarda, Kichererbsen, Parmesan und hausgemachte Balsamico-Vinaigrette",
      },
      {
        name: "Knusprige Riesengarnelen",
        price: "27,50 €",
        description:
          "Rote Zwiebeln, Paprika, Kirschtomaten, Avocado, Fregola Sarda, Knoblauchsauce, Trüffelcreme und Dip-Pommes",
      },
      {
        name: "Grillgemüse",
        price: "16,90 €",
        description: "Dazu Knoblauchbrot",
      },
      {
        name: "Aubergine und Zucchini überbacken",
        price: "18,90 €",
        description:
          "Gegrillte Aubergine und Zucchini in Tomatensauce, mit Mozzarella und Parmesan überbacken, dazu Knoblauchbrot",
      },
      {
        name: "Pilzschnitzelchen",
        price: "17,90 €",
        description:
          "In Pankomehl panierte Pilze, rote Zwiebeln, Paprika, Knoblauchsauce, Trüffelcreme und Pommes frites",
      },
      {
        name: "Joka-Pfanne",
        price: "19,90 €",
        description:
          "Geschnetzeltes Schweinefilet mit Tomaten, Paprika, Zwiebeln und Champignons in einer pikanten Sauce, dazu Butterreis",
      },
    ],
  },
  {
    title: "Highlights",
    items: [
      {
        name: "Mediterranes Rumpsteak",
        price: "32,90 €",
        description:
          "Grillgemüse, Fregola Sarda, Rucolasalat, Chiliöl, Parmesan und Knoblauchbrot",
      },
      {
        name: "Schweinefilet",
        price: "25,90 €",
        description:
          "In pikanter Chili-Tomatensauce, mit Mozzarella und Tomate überbacken, dazu Kroketten",
      },
      {
        name: "Surf ’n’ Turf",
        price: "32,90 €",
        description:
          "Rumpsteak, knusprige Riesengarnelen, frische Champignons, Rucola, Paprika, Kirschtomaten, Parmesan, Trüffelöl und Dip-Pommes",
      },
      {
        name: "Schweinefilet im Speckmantel mit Scampispieß",
        price: "27,90 €",
        description: "Dazu Kroketten",
      },
      {
        name: "Schweinefilet Special",
        price: "24,50 €",
        description:
          "Avocado, Jalapeños, Kirschtomaten, Chiliöl, Paprika, Rucola, Parmesan und Pommes frites",
      },
      {
        name: "Karamellisiertes Lachsfilet",
        price: "28,90 €",
        description:
          "Grillgemüse, Fregola Sarda, Chiliöl, Parmesan, Rucola und Knoblauchbrot",
      },
      {
        name: "Kabeljau-Piccata",
        price: "28,90 €",
        description:
          "Kabeljaufilet in Parmesanhülle, rote Zwiebeln, Paprika, Knoblauchsauce, Trüffelcreme und Dip-Pommes",
      },
    ],
  },
  {
    title: "Klassiker",
    items: [
      {
        name: "Grillteller",
        price: "21,50 €",
        description:
          "Hacksteak, Schweinelachs, Nackensteak, Ćevapčići und Bauchspeck mit Pommes frites und Djuveč-Reis",
      },
      {
        name: "Steakteller",
        price: "25,90 €",
        description:
          "Rumpsteak, Schweinefiletmedaillon und Hähnchenbrust mit Dip-Pommes",
      },
      {
        name: "Mix Grill",
        price: "18,90 €",
        description:
          "Hähnchenbrust, Hacksteak und Nackensteak mit Pommes frites und Djuveč-Reis",
      },
      {
        name: "Schweinefiletröllchen",
        price: "25,90 €",
        description:
          "Gefüllt mit Kochschinken und Käse, dazu Kroketten",
      },
      {
        name: "Schweinefiletmedaillons am Spieß",
        price: "25,90 €",
        description:
          "Mit Paprika, Zwiebeln, Bauchspeck und Djuveč-Reis",
      },
      {
        name: "Argentinisches Rumpsteak",
        price: "28,90 €",
        description: "Mit Dip-Pommes",
      },
      {
        name: "Cordon Bleu",
        price: "23,90 €",
        description:
          "Putenbrust mit Kochschinken und Käse gefüllt, dazu Kroketten",
      },
      {
        name: "Hacksteak Montenegro",
        price: "18,90 €",
        description: "Mit Hirtenkäse gefüllt, dazu Djuveč-Reis",
      },
      {
        name: "Hausplatte für zwei Personen",
        price: "52,00 €",
        description:
          "Rumpsteak, mit Hirtenkäse gefülltes Hacksteak, Hähnchenbrust, Schweinefiletmedaillons und Gemüse mit Sauce Hollandaise, dazu Pommes frites und Djuveč-Reis",
      },
      {
        name: "Grillplatte für zwei Personen",
        price: "48,00 €",
        description:
          "Zwei Hacksteaks, zwei Nackensteaks, Ćevapčići, zwei Stück Bauchspeck und zwei Stück Leber",
      },
    ],
  },
  {
    title: "Gerichte für Kinder",
    items: [
      {
        name: "Hähnchenschnitzel",
        price: "9,90 €",
        description: "Mit Pommes frites",
      },
      {
        name: "Ćevapčići",
        price: "9,90 €",
        description: "Mit Djuveč-Reis",
      },
    ],
  },
  {
    title: "Süßes Finale",
    items: [
      {
        name: "Vanilleeis mit heißen Kirschen",
        price: "8,90 €",
        description: "Mit Obst der Saison",
      },
      {
        name: "Vanilleeis mit heißer Schokolade",
        price: "8,90 €",
        description: "Mit Obst der Saison",
      },
    ],
  },
];

type SiteSettings = {
  [key: string]: string;
};

async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { data, error } = await supabase
      .from("site_settings")
      .select("key,value");

    if (error || !data) {
      console.error("Fehler beim Laden der Einstellungen:", error);
      return {};
    }

    const settings: SiteSettings = {};

    for (const item of data) {
      settings[item.key] = item.value;
    }

    return settings;
  } catch (error) {
    console.error("Supabase Fehler:", error);
    return {};
  }
}

function RestaurantImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export default async function Home() {
  const settings = await getSiteSettings();

  const heroImage = settings.hero_image || "/restaurant-3.jpg";
  const restaurantImage1 =
    settings.restaurant_image_1 || "/restaurant-1.jpg";
  const restaurantImage2 =
    settings.restaurant_image_2 || "/restaurant-2.jpg";
  const restaurantImage3 =
    settings.restaurant_image_3 || "/restaurant-3.jpg";
  const restaurantImage4 =
    settings.restaurant_image_4 || "/restaurant-4.jpg";

  return (
    <main className="bg-[#f6f1e8] text-[#17130f]">
      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#11100e]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="text-xl font-semibold tracking-[0.12em] text-[#d8b66b]">
            RESTAURANT ADRIA
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
            <a href="#ueber-uns" className="transition hover:text-[#d8b66b]">
              Über uns
            </a>
            <a href="#angebote" className="transition hover:text-[#d8b66b]">
              Angebote
            </a>
            <a href="#speisekarte" className="transition hover:text-[#d8b66b]">
              Speisekarte
            </a>
            <a href="#kontakt" className="transition hover:text-[#d8b66b]">
              Kontakt
            </a>
          </nav>

          <a
            href="tel:+49426182301"
            className="rounded-full border border-[#d8b66b] px-4 py-2 text-sm font-medium text-[#d8b66b] transition hover:bg-[#d8b66b] hover:text-[#11100e]"
          >
            Tisch reservieren
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[760px] overflow-hidden">
        <div className="absolute inset-0">
          <RestaurantImage
            src={heroImage}
            alt="Restaurant Adria in Rotenburg"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 pt-24 md:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-[#d8b66b]">
              Balkan- &amp; internationale Küche
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
              Herzlich willkommen im Restaurant Adria
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              Genießen Sie besondere Momente in gemütlicher Atmosphäre mit
              Balkan-Klassikern, internationalen Spezialitäten und herzlicher
              Gastfreundschaft.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+49426182301"
                className="rounded-full bg-[#d8b66b] px-7 py-3.5 font-semibold text-[#17130f] transition hover:bg-[#e3c47d]"
              >
                Jetzt reservieren
              </a>

              <a
                href="#speisekarte"
                className="rounded-full border border-white/50 px-7 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Speisekarte ansehen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ÜBER UNS */}
      <section id="ueber-uns" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a37c2f]">
                Restaurant Adria
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Genuss, Gastfreundschaft und Atmosphäre
              </h2>

              <p className="mt-7 text-lg leading-8 text-black/65">
                Im Restaurant Adria verbinden wir traditionelle Balkan-Küche
                mit internationalen Gerichten. Frische Zutaten, herzhafte
                Grillgerichte und eine angenehme Atmosphäre stehen bei uns im
                Mittelpunkt.
              </p>

              <p className="mt-5 text-lg leading-8 text-black/65">
                Ob ein gemütliches Abendessen, ein Treffen mit Freunden oder
                ein besonderer Anlass – wir freuen uns darauf, Sie bei uns
                begrüßen zu dürfen.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-72 overflow-hidden rounded-[28px]">
                <RestaurantImage
                  src={restaurantImage1}
                  alt="Gastraum Restaurant Adria"
                />
              </div>

              <div className="mt-10 h-72 overflow-hidden rounded-[28px]">
                <RestaurantImage
                  src={restaurantImage2}
                  alt="Restaurant Adria Weinbereich"
                />
              </div>

              <div className="-mt-10 h-72 overflow-hidden rounded-[28px]">
                <RestaurantImage
                  src={restaurantImage3}
                  alt="Restaurant Adria Bar"
                />
              </div>

              <div className="h-72 overflow-hidden rounded-[28px]">
                <RestaurantImage
                  src={restaurantImage4}
                  alt="Restaurant Adria Außenbereich"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANGEBOTE */}
      <section id="angebote" className="bg-[#171512] px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8b66b]">
              Aktuelle Angebote
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Besondere Genussmomente
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d8b66b]">
                Saisonangebot
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                Pfifferlinge
              </h3>

              <div className="mt-8 space-y-7">
                <div>
                  <h4 className="text-xl font-semibold">
                    Schweinefilet mit Pfifferlingen
                  </h4>
                  <p className="mt-2 text-white/65">
                    Zartes Schweinefilet mit frischen Pfifferlingen.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">
                    Argentinisches Rumpsteak mit Pfifferlingen
                  </h4>
                  <p className="mt-2 text-white/65">
                    Saftiges argentinisches Rumpsteak mit frischen
                    Pfifferlingen.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm italic text-white/50">
                Nur solange Pfifferlinge verfügbar sind.
              </p>
            </article>

            <article className="rounded-[30px] border border-[#d8b66b]/30 bg-[#d8b66b]/10 p-8 md:p-10">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d8b66b]">
                Jeden Mittwoch
              </p>

              <div className="mt-4 flex items-end justify-between gap-5">
                <h3 className="text-3xl font-semibold">
                  Damenabend
                </h3>

                <span className="text-2xl font-semibold text-[#d8b66b]">
                  24,90 €
                </span>
              </div>

              <p className="mt-3 text-white/65">
                Genießen • Anstoßen • Gemeinsam einen schönen Abend verbringen
              </p>

              <div className="mt-8 space-y-5 text-white/85">
                <p>
                  <strong className="text-white">Aperitif:</strong> Aperol
                  Spritz
                </p>

                <p>
                  <strong className="text-white">Salat:</strong> Frischer Salat
                  vom Buffet
                </p>

                <div>
                  <strong className="text-white">Hauptgericht nach Wahl:</strong>

                  <ul className="mt-4 space-y-3 text-white/70">
                    <li>
                      Gegrilltes Hähnchenfilet mit frischem Blattsalat
                    </li>
                    <li>
                      Putensteak Hawaii mit Ananas und Käse gratiniert, dazu
                      Kroketten
                    </li>
                    <li>
                      Pola-Pola mit Ćevapčići, Pljeskavica, Djuveč-Reis und
                      Pommes frites
                    </li>
                    <li>
                      Grillgemüse mit knusprigem Röstbrot
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SPEISEKARTE */}
      <section id="speisekarte" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a37c2f]">
              Unsere Küche
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Speisekarte
            </h2>

            <p className="mt-5 text-lg leading-8 text-black/60">
              Balkan-Spezialitäten, Grillgerichte und internationale Klassiker.
            </p>
          </div>

          <div className="space-y-16">
            {menuSections.map((section) => (
              <section key={section.title}>
                <div className="mb-8 flex items-center gap-5">
                  <h3 className="whitespace-nowrap text-2xl font-semibold md:text-3xl">
                    {section.title}
                  </h3>
                  <div className="h-px w-full bg-black/15" />
                </div>

                <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
                  {section.items.map((item) => (
                    <article
                      key={item.name}
                      className="border-b border-black/10 pb-6"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <h4 className="text-lg font-semibold">
                          {item.name}
                        </h4>

                        <span className="shrink-0 font-semibold text-[#926d25]">
                          {item.price}
                        </span>
                      </div>

                      <p className="mt-2 leading-7 text-black/55">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="bg-[#eae2d5] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a37c2f]">
              Einblicke
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Willkommen bei Adria
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="h-[420px] overflow-hidden rounded-[26px]">
              <RestaurantImage
                src={restaurantImage1}
                alt="Restaurant Adria Innenraum"
              />
            </div>

            <div className="h-[420px] overflow-hidden rounded-[26px]">
              <RestaurantImage
                src={restaurantImage2}
                alt="Weinbereich Restaurant Adria"
              />
            </div>

            <div className="h-[420px] overflow-hidden rounded-[26px]">
              <RestaurantImage
                src={restaurantImage3}
                alt="Bar Restaurant Adria"
              />
            </div>

            <div className="h-[420px] overflow-hidden rounded-[26px]">
              <RestaurantImage
                src={restaurantImage4}
                alt="Außenbereich Restaurant Adria"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-[#11100e] px-5 py-24 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8b66b]">
                Kontakt & Reservierung
              </p>

              <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
                Wir freuen uns auf Ihren Besuch
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                Reservierungen nehmen wir gerne telefonisch entgegen.
              </p>

              <a
                href="tel:+49426182301"
                className="mt-8 inline-flex rounded-full bg-[#d8b66b] px-7 py-3.5 font-semibold text-[#17130f] transition hover:bg-[#e3c47d]"
              >
                04261 82301 anrufen
              </a>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-7">
                <h3 className="text-xl font-semibold text-[#d8b66b]">
                  Adresse
                </h3>

                <p className="mt-5 leading-7 text-white/70">
                  Restaurant Adria
                  <br />
                  Mühlenstraße 29
                  <br />
                  27356 Rotenburg
                </p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-7">
                <h3 className="text-xl font-semibold text-[#d8b66b]">
                  Öffnungszeiten
                </h3>

                <div className="mt-5 space-y-3 text-white/70">
                  <p>
                    Dienstag – Sonntag
                    <br />
                    11:30 – 14:30 Uhr
                  </p>

                  <p>
                    Dienstag – Sonntag
                    <br />
                    17:30 – 23:00 Uhr
                  </p>

                  <p>
                    Montag
                    <br />
                    Ruhetag
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#11100e] px-5 py-8 text-white/50 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p>© 2026 Restaurant Adria Rotenburg</p>

          <p>Balkan- und internationale Küche</p>
        </div>
      </footer>
    </main>
  );
}