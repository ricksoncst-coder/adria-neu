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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#061a3a] text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#d6b15c]/20 bg-[#061a3a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <p className="font-serif text-xl tracking-[0.15em] text-[#d6b15c] sm:text-2xl">
              RESTAURANT ADRIA
            </p>
            <p className="hidden text-[9px] uppercase tracking-[0.25em] text-white/45 sm:block">
              Balkanische Küche · Steak & Grill
            </p>
          </div>

          <nav className="hidden items-center gap-7 text-sm lg:flex">
            <a href="#start" className="hover:text-[#d6b15c]">
              Start
            </a>
            <a href="#angebote" className="hover:text-[#d6b15c]">
              Angebote
            </a>
            <a href="#speisekarte" className="hover:text-[#d6b15c]">
              Speisekarte
            </a>
            <a href="#ueber-uns" className="hover:text-[#d6b15c]">
              Über uns
            </a>
            <a href="#kontakt" className="hover:text-[#d6b15c]">
              Kontakt
            </a>
          </nav>

          <a
            href="tel:0426182301"
            className="rounded-full border border-[#d6b15c] px-4 py-2 text-sm font-medium text-[#d6b15c] transition hover:bg-[#d6b15c] hover:text-[#061a3a]"
          >
            04261 82301
          </a>
        </div>
      </header>

      {/* Start */}
      <section
        id="start"
        className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#123c70_0%,#061a3a_60%,#031127_100%)]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d6b15c] sm:text-sm">
            Willkommen im Restaurant Adria
          </p>

          <div className="mx-auto mt-8 flex h-48 w-48 items-center justify-center rounded-full border border-[#d6b15c]/60 sm:h-60 sm:w-60">
            <div className="flex h-[88%] w-[88%] items-center justify-center rounded-full border border-[#d6b15c]/25">
              <div>
                <p className="font-serif text-4xl tracking-[0.12em] text-[#d6b15c] sm:text-5xl">
                  ADRIA
                </p>
                <div className="mx-auto my-3 h-px w-24 bg-[#d6b15c]" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#d6b15c]">
                  Restaurant
                </p>
              </div>
            </div>
          </div>

          <h1 className="mt-9 font-serif text-4xl text-white sm:text-6xl">
            Balkanische Küche
            <span className="block text-[#d6b15c]">Steak & Grill</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Traditioneller Geschmack, ausgewählte Spezialitäten und herzliche
            Gastfreundschaft in Rotenburg.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#speisekarte"
              className="rounded-full bg-[#d6b15c] px-8 py-4 font-semibold text-[#061a3a] transition hover:opacity-90"
            >
              Speisekarte entdecken
            </a>

            <a
              href="#angebote"
              className="rounded-full border border-[#d6b15c] px-8 py-4 font-semibold text-[#d6b15c] transition hover:bg-[#d6b15c] hover:text-[#061a3a]"
            >
              Aktuelle Angebote
            </a>
          </div>
        </div>
      </section>

      {/* Angebote */}
      <section id="angebote" className="bg-[#03142e] px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#d6b15c]">
              Aktuell bei Adria
            </p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Besondere Angebote
            </h2>
            <div className="mx-auto mt-7 h-px w-24 bg-[#d6b15c]" />
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Pfifferlinge */}
            <article className="rounded-3xl border border-[#d6b15c]/35 bg-[#071d3d] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d6b15c]">
                Saisonangebot
              </p>

              <h3 className="mt-3 font-serif text-4xl text-[#d6b15c]">
                Pfifferlinge
              </h3>

              <div className="my-7 h-px bg-[#d6b15c]/20" />

              <div className="space-y-7">
                <div>
                  <h4 className="font-serif text-xl">
                    Schweinefilet mit Pfifferlingen
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Zartes Schweinefilet mit frischen Pfifferlingen.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-xl">
                    Argentinisches Rumpsteak mit Pfifferlingen
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Saftiges argentinisches Rumpsteak mit frischen
                    Pfifferlingen.
                  </p>
                </div>
              </div>

              <p className="mt-9 rounded-xl border border-[#d6b15c]/20 px-4 py-3 text-center text-sm text-[#d6b15c]">
                Nur solange Pfifferlinge verfügbar sind.
              </p>
            </article>

            {/* Damenabend */}
            <article className="rounded-3xl border border-[#d6b15c]/50 bg-[#071d3d] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d6b15c]">
                Jeden Mittwoch
              </p>

              <h3 className="mt-3 font-serif text-4xl text-[#d6b15c]">
                Damenabend
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/55">
                Genießen • Anstoßen • Gemeinsam einen schönen Abend verbringen
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#03142e] p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Aperitif
                  </p>
                  <p className="mt-2 text-[#d6b15c]">Aperol Spritz</p>
                </div>

                <div className="rounded-2xl bg-[#03142e] p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Salat
                  </p>
                  <p className="mt-2 text-[#d6b15c]">
                    Frischer Salat vom Buffet
                  </p>
                </div>
              </div>

              <p className="mt-7 text-xs uppercase tracking-[0.25em] text-white/40">
                Hauptgericht nach Wahl
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <h4 className="font-serif text-lg">
                    Gegrilltes Hähnchenfilet
                  </h4>
                  <p className="mt-1 text-sm text-white/50">
                    Saftig gegrilltes Hähnchenfilet mit frischem Blattsalat
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg">Putensteak Hawaii</h4>
                  <p className="mt-1 text-sm text-white/50">
                    Gegrilltes Putensteak mit Ananas und Käse gratiniert, dazu
                    Kroketten
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg">Pola-Pola</h4>
                  <p className="mt-1 text-sm text-white/50">
                    Ćevapčići und Pljeskavica vom Grill, dazu Djuveč-Reis und
                    Pommes frites
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg">Grillgemüse</h4>
                  <p className="mt-1 text-sm text-white/50">
                    Frisch gegrilltes Gemüse mit knusprigem Röstbrot
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#d6b15c] p-5 text-center text-[#061a3a]">
                <p className="font-serif text-3xl font-semibold">24,90 €</p>
                <p className="text-xs uppercase tracking-[0.2em]">
                  pro Person
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Speisekarte */}
      <section id="speisekarte" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#d6b15c]">
              Genuss aus unserer Küche
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Unsere Speisekarte
            </h2>

            <div className="mx-auto mt-7 h-px w-24 bg-[#d6b15c]" />
          </div>

          <div className="mt-16 space-y-20">
            {menuSections.map((section) => (
              <section key={section.title}>
                <div className="mb-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#d6b15c]/25" />
                  <h3 className="max-w-[75%] text-center font-serif text-2xl uppercase tracking-[0.12em] text-[#d6b15c] sm:text-3xl">
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 bg-[#d6b15c]/25" />
                </div>

                <div className="grid gap-x-14 gap-y-7 lg:grid-cols-2">
                  {section.items.map((item) => (
                    <article
                      key={item.name}
                      className="border-b border-white/10 pb-6"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <h4 className="font-serif text-lg sm:text-xl">
                          {item.name}
                        </h4>

                        <span className="shrink-0 font-semibold text-[#d6b15c]">
                          {item.price}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-white/50">
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

      {/* Über uns */}
      <section id="ueber-uns" className="bg-[#03142e] px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d6b15c]">
            Gastfreundschaft & Genuss
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
            Willkommen bei Adria
          </h2>

          <div className="mx-auto my-8 h-px w-20 bg-[#d6b15c]" />

          <p className="text-base leading-8 text-white/60 sm:text-lg">
            Im Restaurant Adria verbinden wir traditionelle Balkanküche mit
            ausgewählten internationalen Gerichten. Freuen Sie sich auf
            Grillspezialitäten, frische Zutaten und einen gemütlichen
            Restaurantbesuch in Rotenburg.
          </p>
        </div>
      </section>

      {/* Öffnungszeiten */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d6b15c]">
            Wir freuen uns auf Sie
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
            Öffnungszeiten
          </h2>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[#d6b15c]/30 bg-[#03142e] p-7 sm:p-9">
            <div className="border-b border-white/10 py-4 sm:flex sm:justify-between">
              <span>Dienstag – Sonntag</span>
              <span className="mt-1 block text-[#d6b15c] sm:mt-0">
                11:30 – 14:30 Uhr
              </span>
            </div>

            <div className="border-b border-white/10 py-4 sm:flex sm:justify-between">
              <span>Dienstag – Sonntag</span>
              <span className="mt-1 block text-[#d6b15c] sm:mt-0">
                17:30 – 23:00 Uhr
              </span>
            </div>

            <div className="py-4 sm:flex sm:justify-between">
              <span>Montag</span>
              <span className="mt-1 block text-[#d6b15c] sm:mt-0">
                Ruhetag
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="bg-[#03142e] px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d6b15c]">
            Besuchen Sie uns
          </p>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
            Kontakt & Anfahrt
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#d6b15c]/30 bg-[#061a3a] p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Restaurant Adria
              </p>

              <p className="mt-5 font-serif text-2xl text-[#d6b15c]">
                Mühlenstraße 29
              </p>

              <p className="mt-2 text-lg text-white/70">
                27356 Rotenburg
              </p>
            </div>

            <div className="rounded-3xl border border-[#d6b15c]/30 bg-[#061a3a] p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Telefon
              </p>

              <a
                href="tel:0426182301"
                className="mt-5 block font-serif text-3xl text-[#d6b15c]"
              >
                04261 82301
              </a>

              <p className="mt-3 text-sm text-white/45">
                Reservierungen telefonisch
              </p>
            </div>
          </div>

          <a
            href="tel:0426182301"
            className="mt-10 inline-block rounded-full bg-[#d6b15c] px-9 py-4 font-semibold text-[#061a3a]"
          >
            Jetzt anrufen
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d6b15c]/20 bg-[#020d20] px-6 py-12 text-center">
        <p className="font-serif text-2xl tracking-[0.18em] text-[#d6b15c]">
          RESTAURANT ADRIA
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
          Balkanische Küche · Steak & Grill
        </p>

        <p className="mt-7 text-xs text-white/25">
          © 2026 Restaurant Adria · Mühlenstraße 29 · 27356 Rotenburg
        </p>
      </footer>
    </main>
  );
}