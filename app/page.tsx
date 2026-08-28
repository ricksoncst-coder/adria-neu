import Image from "next/image";

const menuSections = [
  {
    title: "Ein bisschen vorweg",
    items: [
      {
        name: "Hausgemachtes Zaziki",
        description: "Mit Knoblauchbrot",
        price: "5,50 €",
      },
      {
        name: "Mozzarella im Serranoschinken",
        description:
          "Gegrillter Mozzarella im Serranomantel mit Röstbrot und Salatbeilage",
        price: "12,90 €",
      },
      {
        name: "Gebackene Mozzarella-Bällchen",
        description:
          "Knusprig panierte Mozzarella-Bällchen mit Knoblauchbrot und Salatbeilage",
        price: "11,90 €",
      },
      {
        name: "Panierter Hirtenkäse",
        description:
          "Knusprig panierter Hirtenkäse mit Röstbrot und Salatbeilage",
        price: "9,90 €",
      },
    ],
  },
  {
    title: "Specials",
    items: [
      {
        name: "Blattsalat mit Knoblauch-Chili-Garnelen",
        description:
          "Tomaten, Gurken, rote Zwiebeln, Paprika, Fregola Sarda, Kichererbsen, Parmesan und hausgemachte Balsamico-Vinaigrette",
        price: "26,90 €",
      },
      {
        name: "Blattsalat mit gegrillten Pilzen",
        description:
          "Halloumi-Grillkäse, Tomaten, Gurken, rote Zwiebeln, Paprika, Fregola, Kichererbsen und hausgemachte Balsamico-Vinaigrette",
        price: "18,90 €",
      },
      {
        name: "Knusprige Riesengarnelen",
        description:
          "Rote Zwiebeln, Paprika, Kirschtomaten, Avocado, Fregola Sarda, Knoblauchsauce, Trüffelcreme und Dip-Pommes",
        price: "27,50 €",
      },
      {
        name: "Grillgemüse",
        description: "Dazu Knoblauchbrot",
        price: "16,90 €",
      },
      {
        name: "Joka-Pfanne",
        description:
          "Geschnetzeltes Schweinefilet mit Tomaten, Paprika, Zwiebeln und Champignons in einer pikanten Sauce, dazu Butterreis",
        price: "19,90 €",
      },
    ],
  },
  {
    title: "Highlights",
    items: [
      {
        name: "Mediterranes Rumpsteak",
        description:
          "Grillgemüse, Fregola Sarda, Rucolasalat, Chiliöl, Parmesan und Knoblauchbrot",
        price: "32,90 €",
      },
      {
        name: "Schweinefilet",
        description:
          "In pikanter Chili-Tomatensauce, mit Mozzarella und Tomate überbacken, dazu Kroketten",
        price: "25,90 €",
      },
      {
        name: "Surf ’n’ Turf",
        description:
          "Rumpsteak, knusprige Riesengarnelen, frische Champignons, Rucola, Paprika, Kirschtomaten, Parmesan, Trüffelöl und Dip-Pommes",
        price: "32,90 €",
      },
      {
        name: "Schweinefilet im Speckmantel mit Scampispieß",
        description: "Dazu Kroketten",
        price: "27,90 €",
      },
      {
        name: "Karamellisiertes Lachsfilet",
        description:
          "Grillgemüse, Fregola Sarda, Chiliöl, Parmesan, Rucola und Knoblauchbrot",
        price: "28,90 €",
      },
      {
        name: "Kabeljau-Piccata",
        description:
          "Kabeljaufilet in Parmesanhülle, rote Zwiebeln, Paprika, Knoblauchsauce, Trüffelcreme und Dip-Pommes",
        price: "28,90 €",
      },
    ],
  },
  {
    title: "Klassiker",
    items: [
      {
        name: "Grillteller",
        description:
          "Hacksteak, Schweinelachs, Nackensteak, Ćevapčići und Bauchspeck mit Pommes frites und Djuveč-Reis",
        price: "21,50 €",
      },
      {
        name: "Steakteller",
        description:
          "Rumpsteak, Schweinefiletmedaillon und Hähnchenbrust mit Dip-Pommes",
        price: "25,90 €",
      },
      {
        name: "Mix Grill",
        description:
          "Hähnchenbrust, Hacksteak und Nackensteak mit Pommes frites und Djuveč-Reis",
        price: "18,90 €",
      },
      {
        name: "Schweinefiletröllchen",
        description:
          "Gefüllt mit Kochschinken und Käse, dazu Kroketten",
        price: "25,90 €",
      },
      {
        name: "Argentinisches Rumpsteak",
        description: "Mit Dip-Pommes",
        price: "28,90 €",
      },
      {
        name: "Cordon Bleu",
        description:
          "Putenbrust mit Kochschinken und Käse gefüllt, dazu Kroketten",
        price: "23,90 €",
      },
      {
        name: "Hacksteak Montenegro",
        description:
          "Mit Hirtenkäse gefüllt, dazu Djuveč-Reis",
        price: "18,90 €",
      },
      {
        name: "Hausplatte für zwei Personen",
        description:
          "Rumpsteak, Hacksteak, Hähnchenbrust, Schweinefiletmedaillons und Gemüse mit Sauce Hollandaise, Pommes frites und Djuveč-Reis",
        price: "52,00 €",
      },
    ],
  },
  {
    title: "Gerichte für Kinder",
    items: [
      {
        name: "Hähnchenschnitzel",
        description: "Mit Pommes frites",
        price: "9,90 €",
      },
      {
        name: "Ćevapčići",
        description: "Mit Djuveč-Reis",
        price: "9,90 €",
      },
    ],
  },
  {
    title: "Süßes Finale",
    items: [
      {
        name: "Vanilleeis mit heißen Kirschen",
        description: "Mit Obst der Saison",
        price: "8,90 €",
      },
      {
        name: "Vanilleeis mit heißer Schokolade",
        description: "Mit Obst der Saison",
        price: "8,90 €",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="bg-[#f6f1e8] text-[#17130f]">
      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#c89c3c]/20 bg-[#090806]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#start" className="leading-none">
            <div className="font-serif text-3xl tracking-[0.16em] text-white">
              ADRIA
            </div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.32em] text-[#d4a437]">
              Balkan- & internationale Küche
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/80 lg:flex">
            <a className="transition hover:text-[#d4a437]" href="#start">
              Home
            </a>
            <a className="transition hover:text-[#d4a437]" href="#speisekarte">
              Speisekarte
            </a>
            <a className="transition hover:text-[#d4a437]" href="#ueber-uns">
              Über uns
            </a>
            <a className="transition hover:text-[#d4a437]" href="#galerie">
              Galerie
            </a>
            <a className="transition hover:text-[#d4a437]" href="#kontakt">
              Kontakt
            </a>
          </nav>

          <a
            href="tel:+49426182301"
            className="rounded-sm border border-[#d4a437] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#e1b650] transition hover:bg-[#d4a437] hover:text-black"
          >
            Tisch reservieren
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="start"
        className="relative flex min-h-[760px] items-center overflow-hidden pt-20"
      >
        <Image
          src="/restaurant-3.jpg"
          alt="Restaurant Adria in Rotenburg"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-serif text-2xl italic text-[#d4a437] md:text-3xl">
              Herzlich willkommen im
            </p>

            <h1 className="mt-3 font-serif text-6xl leading-[0.95] text-white md:text-8xl">
              Restaurant
              <span className="block">Adria</span>
            </h1>

            <div className="my-7 h-px w-16 bg-[#d4a437]" />

            <p className="max-w-xl text-lg leading-8 text-white/85 md:text-xl">
              Balkan- und internationale Küche mit Herz, Tradition und
              ausgewählten Zutaten.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="tel:+49426182301"
                className="bg-[#d4a437] px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-[#e5bc59]"
              >
                ☎ Tisch reservieren
              </a>

              <a
                href="#speisekarte"
                className="border border-[#d4a437] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#d4a437] hover:text-black"
              >
                Speisekarte ansehen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ÜBER UNS */}
      <section id="ueber-uns" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#bd8b27]">
                  Über uns
                </span>
                <span className="h-px w-12 bg-[#bd8b27]" />
              </div>

              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#0c1b2d] md:text-5xl">
                Tradition.
                <br />
                Genuss.
                <br />
                Gastfreundschaft.
              </h2>

              <p className="mt-7 max-w-md leading-7 text-black/65">
                Im Restaurant Adria verbinden wir traditionelle Balkan-Küche
                mit internationalen Spezialitäten. Genießen Sie gutes Essen,
                ein gemütliches Ambiente und herzliche Gastfreundschaft mitten
                in Rotenburg.
              </p>

              <a
                href="#kontakt"
                className="mt-8 inline-block bg-[#0b1725] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white"
              >
                Mehr über uns →
              </a>
            </div>

            <div
              id="galerie"
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
            >
              <PhotoCard
                src="/restaurant-1.jpg"
                title="Gemütliches Ambiente"
                text="Authentisches Restaurant mit viel Charakter."
              />

              <PhotoCard
                src="/restaurant-2.jpg"
                title="Erlesene Weine"
                text="Eine ausgewählte Auswahl an Weinen."
              />

              <PhotoCard
                src="/restaurant-3.jpg"
                title="Restaurant Adria"
                text="Herzlich, warm und einladend."
              />

              <PhotoCard
                src="/restaurant-4.jpg"
                title="Außenbereich"
                text="Genießen Sie schöne Stunden auf unserer Terrasse."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ANGEBOTE */}
      <section className="bg-[#0a0d0f] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d4a437]">
              Aktuelle Angebote
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Besonders genießen
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="border border-[#d4a437]/30 bg-[#111517] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-[#d4a437]">
                Saisonangebot
              </p>
              <h3 className="mt-3 font-serif text-3xl">Pfifferlinge</h3>

              <div className="mt-7 space-y-6">
                <div>
                  <p className="font-semibold">
                    Schweinefilet mit Pfifferlingen
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    Zartes Schweinefilet mit frischen Pfifferlingen.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    Argentinisches Rumpsteak mit Pfifferlingen
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    Saftiges argentinisches Rumpsteak mit frischen
                    Pfifferlingen.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-xs italic text-[#d4a437]">
                Nur solange Pfifferlinge verfügbar sind.
              </p>
            </div>

            <div className="border border-[#d4a437]/30 bg-[#111517] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-[#d4a437]">
                Jeden Mittwoch
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">
                <h3 className="font-serif text-3xl">Damenabend</h3>
                <div className="font-serif text-3xl text-[#d4a437]">
                  24,90 €
                </div>
              </div>

              <p className="mt-3 text-sm text-white/55">
                Genießen • Anstoßen • Gemeinsam einen schönen Abend verbringen
              </p>

              <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
                <div className="border border-white/10 p-4">
                  Aperol Spritz
                </div>
                <div className="border border-white/10 p-4">
                  Salat vom Buffet
                </div>
                <div className="border border-white/10 p-4">
                  Gegrilltes Hähnchenfilet
                </div>
                <div className="border border-white/10 p-4">
                  Putensteak Hawaii
                </div>
                <div className="border border-white/10 p-4">Pola-Pola</div>
                <div className="border border-white/10 p-4">Grillgemüse</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section
        id="speisekarte"
        className="bg-[#11100e] px-6 py-24 text-white lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-14 bg-[#d4a437]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d4a437]">
                Unsere Speisekarte
              </p>
              <span className="h-px w-14 bg-[#d4a437]" />
            </div>

            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Kulinarische Highlights
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/55">
              Traditionelle Klassiker, moderne Spezialitäten und ausgewählte
              Gerichte aus unserer Küche.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {menuSections.map((section) => (
              <div key={section.title}>
                <div className="mb-8 flex items-center gap-5">
                  <h3 className="whitespace-nowrap font-serif text-3xl text-[#d4a437]">
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 bg-[#d4a437]/25" />
                </div>

                <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="border-b border-white/10 pb-6"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <h4 className="font-serif text-xl">{item.name}</h4>
                        <span className="whitespace-nowrap font-semibold text-[#d4a437]">
                          {item.price}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-white/50">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY LARGE */}
      <section className="bg-[#f6f1e8] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#bd8b27]">
              Impressionen
            </p>
            <h2 className="mt-3 font-serif text-4xl text-[#0c1b2d] md:text-5xl">
              Restaurant Adria
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative min-h-[500px] overflow-hidden">
              <Image
                src="/restaurant-1.jpg"
                alt="Gastraum Restaurant Adria"
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="grid gap-5">
              <div className="relative min-h-[240px] overflow-hidden">
                <Image
                  src="/restaurant-3.jpg"
                  alt="Restaurant Adria Theke"
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative min-h-[240px] overflow-hidden">
                  <Image
                    src="/restaurant-2.jpg"
                    alt="Weinauswahl Restaurant Adria"
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="relative min-h-[240px] overflow-hidden">
                  <Image
                    src="/restaurant-4.jpg"
                    alt="Außenbereich Restaurant Adria"
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="bg-[#0b1725] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a437]">
              Restaurant Adria
            </p>

            <h2 className="mt-4 font-serif text-5xl">
              Wir freuen uns
              <span className="block text-[#d4a437]">auf Ihren Besuch.</span>
            </h2>

            <div className="mt-9 space-y-4 text-white/70">
              <p>
                <span className="text-[#d4a437]">Adresse:</span>
                <br />
                Mühlenstraße 29
                <br />
                27356 Rotenburg
              </p>

              <p>
                <span className="text-[#d4a437]">Telefon:</span>
                <br />
                <a
                  href="tel:+49426182301"
                  className="text-xl text-white hover:text-[#d4a437]"
                >
                  04261 82301
                </a>
              </p>
            </div>

            <a
              href="tel:+49426182301"
              className="mt-8 inline-block bg-[#d4a437] px-7 py-4 font-semibold text-black"
            >
              Jetzt telefonisch reservieren
            </a>
          </div>

          <div className="border border-[#d4a437]/30 bg-black/15 p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-[#d4a437]">
              Öffnungszeiten
            </p>

            <div className="mt-7 space-y-5">
              <OpeningRow
                day="Dienstag – Sonntag"
                time="11:30 – 14:30 Uhr"
              />
              <OpeningRow day="" time="17:30 – 23:00 Uhr" />
              <OpeningRow day="Montag" time="Ruhetag" />
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="font-serif text-2xl text-[#d4a437]">
                Balkan- und internationale Küche
              </p>
              <p className="mt-3 text-sm leading-6 text-white/50">
                Traditioneller Geschmack, ausgewählte Spezialitäten und
                herzliche Gastfreundschaft in Rotenburg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d4a437]/15 bg-[#06090d] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="font-serif text-2xl tracking-[0.14em]">ADRIA</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#d4a437]">
              Balkan- und internationale Küche
            </p>
          </div>

          <p className="text-xs text-white/35">
            © 2026 Restaurant Adria · Rotenburg
          </p>

          <a
            href="tel:+49426182301"
            className="text-sm text-[#d4a437]"
          >
            04261 82301
          </a>
        </div>
      </footer>
    </main>
  );
}

function PhotoCard({
  src,
  title,
  text,
}: {
  src: string;
  title: string;
  text: string;
}) {
  return (
    <div className="overflow-hidden bg-white shadow-sm">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition duration-700 hover:scale-105"
        />
      </div>

      <div className="p-6 text-center">
        <h3 className="font-serif text-xl text-[#0c1b2d]">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-black/55">{text}</p>
      </div>
    </div>
  );
}

function OpeningRow({ day, time }: { day: string; time: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-white/10 pb-4">
      <span className="text-white/55">{day}</span>
      <span className="text-right font-medium">{time}</span>
    </div>
  );
}