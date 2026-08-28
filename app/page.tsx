import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SiteSettings = {
  [key: string]: string;
};

type MenuItem = {
  id: number;
  category: string;
  name: string;
  description: string | null;
  price: number | string | null;
  sort_order: number | null;
};

type Offer = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  price: number | string | null;
  active: boolean;
  sort_order: number | null;
  content: any;
};

const categoryOrder = [
  "Ein bisschen vorweg",
  "Specials",
  "Highlights",
  "Klassiker",
  "Gerichte für Kinder",
  "Süßes Finale",
];

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = getSupabase();

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

async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("menu_items")
      .select("id,category,name,description,price,sort_order")
      .order("sort_order", { ascending: true });

    if (error || !data) {
      console.error("Fehler beim Laden der Speisekarte:", error);
      return [];
    }

    return data as MenuItem[];
  } catch (error) {
    console.error("Speisekarte Supabase Fehler:", error);
    return [];
  }
}

async function getOffers(): Promise<Offer[]> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("offers")
      .select(
        "id,slug,title,subtitle,description,price,active,sort_order,content"
      )
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      console.error("Fehler beim Laden der Angebote:", error);
      return [];
    }

    return data as Offer[];
  } catch (error) {
    console.error("Angebote Supabase Fehler:", error);
    return [];
  }
}

function formatPrice(price: number | string | null | undefined) {
  if (price === null || price === undefined || price === "") {
    return "";
  }

  const number = Number(price);

  if (Number.isNaN(number)) {
    return String(price);
  }

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);
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
  const [settings, menuItems, offers] = await Promise.all([
    getSiteSettings(),
    getMenuItems(),
    getOffers(),
  ]);

  const heroImage =
    settings.hero_image || "/restaurant-3.jpg";

  const restaurantImage1 =
    settings.restaurant_image_1 || "/restaurant-1.jpg";

  const restaurantImage2 =
    settings.restaurant_image_2 || "/restaurant-2.jpg";

  const restaurantImage3 =
    settings.restaurant_image_3 || "/restaurant-3.jpg";

  const restaurantImage4 =
    settings.restaurant_image_4 || "/restaurant-4.jpg";

  const menuSections = categoryOrder
    .map((category) => ({
      title: category,
      items: menuItems
        .filter((item) => item.category === category)
        .sort(
          (a, b) =>
            (a.sort_order ?? 0) - (b.sort_order ?? 0)
        ),
    }))
    .filter((section) => section.items.length > 0);

  const otherCategories = Array.from(
    new Set(
      menuItems
        .map((item) => item.category)
        .filter(
          (category) =>
            category &&
            !categoryOrder.includes(category)
        )
    )
  );

  for (const category of otherCategories) {
    menuSections.push({
      title: category,
      items: menuItems
        .filter((item) => item.category === category)
        .sort(
          (a, b) =>
            (a.sort_order ?? 0) - (b.sort_order ?? 0)
        ),
    });
  }

  const ladiesOffer = offers.find(
    (offer) => offer.slug === "damenabend"
  );

  const seasonalOffer = offers.find(
    (offer) => offer.slug === "pfifferlinge"
  );

  return (
    <main className="bg-[#f6f1e8] text-[#17130f]">
      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#11100e]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#"
            className="text-xl font-semibold tracking-[0.12em] text-[#d8b66b]"
          >
            RESTAURANT ADRIA
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
            <a
              href="#ueber-uns"
              className="transition hover:text-[#d8b66b]"
            >
              Über uns
            </a>

            <a
              href="#angebote"
              className="transition hover:text-[#d8b66b]"
            >
              Angebote
            </a>

            <a
              href="#speisekarte"
              className="transition hover:text-[#d8b66b]"
            >
              Speisekarte
            </a>

            <a
              href="#kontakt"
              className="transition hover:text-[#d8b66b]"
            >
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
              Genießen Sie besondere Momente in gemütlicher Atmosphäre
              mit Balkan-Klassikern, internationalen Spezialitäten und
              herzlicher Gastfreundschaft.
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
      <section
        id="ueber-uns"
        className="px-5 py-24 md:px-8 md:py-32"
      >
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
                Im Restaurant Adria verbinden wir traditionelle
                Balkan-Küche mit internationalen Gerichten. Frische
                Zutaten, herzhafte Grillgerichte und eine angenehme
                Atmosphäre stehen bei uns im Mittelpunkt.
              </p>

              <p className="mt-5 text-lg leading-8 text-black/65">
                Ob ein gemütliches Abendessen, ein Treffen mit Freunden
                oder ein besonderer Anlass – wir freuen uns darauf, Sie
                bei uns begrüßen zu dürfen.
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
      {(seasonalOffer || ladiesOffer) && (
        <section
          id="angebote"
          className="bg-[#171512] px-5 py-24 text-white md:px-8"
        >
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
              {/* SAISONANGEBOT */}
              {seasonalOffer && (
                <article className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#d8b66b]">
                    {seasonalOffer.subtitle || "Saisonangebot"}
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold">
                    {seasonalOffer.title}
                  </h3>

                  {seasonalOffer.description && (
                    <p className="mt-3 text-white/65">
                      {seasonalOffer.description}
                    </p>
                  )}

                  <div className="mt-8 space-y-7">
                    {(seasonalOffer.content?.dishes || []).map(
                      (
                        dish: {
                          name?: string;
                          description?: string;
                          price?: number | string | null;
                        },
                        index: number
                      ) => (
                        <div key={`${dish.name}-${index}`}>
                          <div className="flex items-start justify-between gap-5">
                            <h4 className="text-xl font-semibold">
                              {dish.name}
                            </h4>

                            {dish.price !== null &&
                              dish.price !== undefined &&
                              dish.price !== "" && (
                                <span className="shrink-0 font-semibold text-[#d8b66b]">
                                  {formatPrice(dish.price)}
                                </span>
                              )}
                          </div>

                          {dish.description && (
                            <p className="mt-2 text-white/65">
                              {dish.description}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {seasonalOffer.content?.note && (
                    <p className="mt-8 text-sm italic text-white/50">
                      {seasonalOffer.content.note}
                    </p>
                  )}
                </article>
              )}

              {/* DAMENABEND */}
              {ladiesOffer && (
                <article className="rounded-[30px] border border-[#d8b66b]/30 bg-[#d8b66b]/10 p-8 md:p-10">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#d8b66b]">
                    {ladiesOffer.subtitle || "Jeden Mittwoch"}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-5">
                    <h3 className="text-3xl font-semibold">
                      {ladiesOffer.title}
                    </h3>

                    {ladiesOffer.price !== null &&
                      ladiesOffer.price !== undefined && (
                        <span className="text-2xl font-semibold text-[#d8b66b]">
                          {formatPrice(ladiesOffer.price)}
                        </span>
                      )}
                  </div>

                  {ladiesOffer.description && (
                    <p className="mt-3 text-white/65">
                      {ladiesOffer.description}
                    </p>
                  )}

                  <div className="mt-8 space-y-5 text-white/85">
                    {ladiesOffer.content?.aperitif && (
                      <p>
                        <strong className="text-white">
                          Aperitif:
                        </strong>{" "}
                        {ladiesOffer.content.aperitif}
                      </p>
                    )}

                    {ladiesOffer.content?.salad && (
                      <p>
                        <strong className="text-white">
                          Salat:
                        </strong>{" "}
                        {ladiesOffer.content.salad}
                      </p>
                    )}

                    {(ladiesOffer.content?.mains || []).length > 0 && (
                      <div>
                        <strong className="text-white">
                          Hauptgericht nach Wahl:
                        </strong>

                        <div className="mt-4 space-y-4">
                          {(ladiesOffer.content?.mains || []).map(
                            (
                              main: {
                                name?: string;
                                description?: string;
                              },
                              index: number
                            ) => (
                              <div
                                key={`${main.name}-${index}`}
                                className="border-b border-white/10 pb-4"
                              >
                                <p className="font-semibold text-white">
                                  {main.name}
                                </p>

                                {main.description && (
                                  <p className="mt-1 text-white/65">
                                    {main.description}
                                  </p>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SPEISEKARTE */}
      <section
        id="speisekarte"
        className="px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a37c2f]">
              Unsere Küche
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Speisekarte
            </h2>

            <p className="mt-5 text-lg leading-8 text-black/60">
              Balkan-Spezialitäten, Grillgerichte und internationale
              Klassiker.
            </p>
          </div>

          {menuSections.length > 0 ? (
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
                        key={item.id}
                        className="border-b border-black/10 pb-6"
                      >
                        <div className="flex items-start justify-between gap-5">
                          <h4 className="text-lg font-semibold">
                            {item.name}
                          </h4>

                          {item.price !== null &&
                            item.price !== undefined && (
                              <span className="shrink-0 font-semibold text-[#926d25]">
                                {formatPrice(item.price)}
                              </span>
                            )}
                        </div>

                        {item.description && (
                          <p className="mt-2 leading-7 text-black/55">
                            {item.description}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center">
              <p className="text-black/60">
                Die Speisekarte wird momentan aktualisiert.
              </p>
            </div>
          )}
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
      <section
        id="kontakt"
        className="bg-[#11100e] px-5 py-24 text-white md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8b66b]">
                Kontakt &amp; Reservierung
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