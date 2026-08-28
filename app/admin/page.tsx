"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type MenuItem = {
  id: number;
  category: string;
  name: string;
  description: string | null;
  price: number | null;
  sort_order: number | null;
};

type MainDish = {
  name: string;
  description: string;
};

type SeasonalDish = {
  name: string;
  description: string;
  price: number | null;
};

type Offer = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  price: number | null;
  active: boolean;
  sort_order: number | null;
  content: any;
};

type SiteSetting = {
  key: string;
  value: string;
};

const imageSlots = [
  {
    key: "hero_image",
    label: "Startseiten-Hintergrund",
  },
  {
    key: "restaurant_image_1",
    label: "Restaurant Bild 1",
  },
  {
    key: "restaurant_image_2",
    label: "Restaurant Bild 2",
  },
  {
    key: "restaurant_image_3",
    label: "Restaurant Bild 3",
  },
  {
    key: "restaurant_image_4",
    label: "Restaurant Bild 4",
  },
];

const categories = [
  "Ein bisschen vorweg",
  "Specials",
  "Highlights",
  "Klassiker",
  "Gerichte für Kinder",
  "Süßes Finale",
];

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("Alle");

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);

      if (session) {
        loadEverything();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      setLoggedIn(true);
      await loadEverything();
    }

    setLoading(false);
  }

  async function loadEverything() {
    await Promise.all([
      loadSettings(),
      loadMenu(),
      loadOffers(),
    ]);
  }

  async function login(event: FormEvent) {
    event.preventDefault();

    setBusy(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Anmeldung fehlgeschlagen: " + error.message);
    } else {
      setMessage("Erfolgreich angemeldet.");
    }

    setBusy(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setLoggedIn(false);
    setMessage("");
  }

  // --------------------------------------------------
  // BILDER
  // --------------------------------------------------

  async function loadSettings() {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key,value");

    if (error) {
      console.error(error);
      return;
    }

    const nextSettings: Record<string, string> = {};

    (data as SiteSetting[] | null)?.forEach((item) => {
      nextSettings[item.key] = item.value;
    });

    setSettings(nextSettings);
  }

  async function uploadImage(
    key: string,
    file: File | undefined
  ) {
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setMessage("Das Bild darf maximal 8 MB groß sein.");
      return;
    }

    setBusy(true);
    setMessage("Bild wird hochgeladen ...");

    try {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName =
        `${key}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("website-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("website-images")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      const { error: saveError } = await supabase
        .from("site_settings")
        .upsert(
          {
            key,
            value: publicUrl,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "key",
          }
        );

      if (saveError) {
        throw saveError;
      }

      setSettings((current) => ({
        ...current,
        [key]: publicUrl,
      }));

      setMessage(
        "Bild wurde gespeichert und ist jetzt mit der Website verbunden."
      );
    } catch (error: any) {
      console.error(error);
      setMessage(
        "Fehler beim Hochladen: " +
          (error?.message || "Unbekannter Fehler")
      );
    }

    setBusy(false);
  }

  // --------------------------------------------------
  // SPEISEKARTE
  // --------------------------------------------------

  async function loadMenu() {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      setMessage("Speisekarte konnte nicht geladen werden.");
      return;
    }

    setMenuItems((data || []) as MenuItem[]);
  }

  function changeMenuItem(
    id: number,
    field: keyof MenuItem,
    value: any
  ) {
    setMenuItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  async function saveMenuItem(item: MenuItem) {
    setBusy(true);
    setMessage("Gericht wird gespeichert ...");

    const { error } = await supabase
      .from("menu_items")
      .update({
        category: item.category,
        name: item.name,
        description: item.description || "",
        price:
          item.price === null || Number.isNaN(item.price)
            ? null
            : item.price,
        sort_order: item.sort_order || 0,
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setMessage("Fehler: " + error.message);
    } else {
      setMessage(`„${item.name}“ wurde gespeichert.`);
    }

    setBusy(false);
  }

  async function addMenuItem() {
    setBusy(true);

    const category =
      selectedCategory === "Alle"
        ? "Specials"
        : selectedCategory;

    const sameCategory = menuItems.filter(
      (item) => item.category === category
    );

    const nextSort =
      sameCategory.length > 0
        ? Math.max(
            ...sameCategory.map(
              (item) => item.sort_order || 0
            )
          ) + 1
        : 1;

    const { data, error } = await supabase
      .from("menu_items")
      .insert({
        category,
        name: "Neues Gericht",
        description: "",
        price: 0,
        sort_order: nextSort,
      })
      .select()
      .single();

    if (error) {
      setMessage("Gericht konnte nicht erstellt werden: " + error.message);
    } else {
      setMenuItems((current) => [
        ...current,
        data as MenuItem,
      ]);

      setSelectedCategory(category);
      setMessage("Neues Gericht wurde erstellt.");
    }

    setBusy(false);
  }

  async function deleteMenuItem(item: MenuItem) {
    const confirmed = window.confirm(
      `Möchtest du „${item.name}“ wirklich löschen?`
    );

    if (!confirmed) return;

    setBusy(true);

    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", item.id);

    if (error) {
      setMessage("Löschen fehlgeschlagen: " + error.message);
    } else {
      setMenuItems((current) =>
        current.filter((menuItem) => menuItem.id !== item.id)
      );

      setMessage("Gericht wurde gelöscht.");
    }

    setBusy(false);
  }

  // --------------------------------------------------
  // ANGEBOTE
  // --------------------------------------------------

  async function loadOffers() {
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      setMessage("Angebote konnten nicht geladen werden.");
      return;
    }

    setOffers((data || []) as Offer[]);
  }

  function updateOffer(
    slug: string,
    field: keyof Offer,
    value: any
  ) {
    setOffers((current) =>
      current.map((offer) =>
        offer.slug === slug
          ? {
              ...offer,
              [field]: value,
            }
          : offer
      )
    );
  }

  function updateOfferContent(
    slug: string,
    newContent: any
  ) {
    setOffers((current) =>
      current.map((offer) =>
        offer.slug === slug
          ? {
              ...offer,
              content: newContent,
            }
          : offer
      )
    );
  }

  async function saveOffer(offer: Offer) {
    setBusy(true);
    setMessage("Angebot wird gespeichert ...");

    const { error } = await supabase
      .from("offers")
      .update({
        title: offer.title,
        subtitle: offer.subtitle || "",
        description: offer.description || "",
        price:
          offer.price === null || Number.isNaN(offer.price)
            ? null
            : offer.price,
        active: offer.active,
        sort_order: offer.sort_order || 0,
        content: offer.content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", offer.id);

    if (error) {
      setMessage("Fehler beim Speichern: " + error.message);
    } else {
      setMessage(`„${offer.title}“ wurde gespeichert.`);
    }

    setBusy(false);
  }

  // --------------------------------------------------
  // DAMENABEND
  // --------------------------------------------------

  function updateLadiesMain(
    index: number,
    field: keyof MainDish,
    value: string
  ) {
    const offer = offers.find(
      (item) => item.slug === "damenabend"
    );

    if (!offer) return;

    const mains: MainDish[] = [
      ...(offer.content?.mains || []),
    ];

    mains[index] = {
      ...mains[index],
      [field]: value,
    };

    updateOfferContent("damenabend", {
      ...offer.content,
      mains,
    });
  }

  function addLadiesMain() {
    const offer = offers.find(
      (item) => item.slug === "damenabend"
    );

    if (!offer) return;

    const mains: MainDish[] = [
      ...(offer.content?.mains || []),
      {
        name: "Neues Hauptgericht",
        description: "",
      },
    ];

    updateOfferContent("damenabend", {
      ...offer.content,
      mains,
    });
  }

  function deleteLadiesMain(index: number) {
    const offer = offers.find(
      (item) => item.slug === "damenabend"
    );

    if (!offer) return;

    const mains: MainDish[] = [
      ...(offer.content?.mains || []),
    ];

    mains.splice(index, 1);

    updateOfferContent("damenabend", {
      ...offer.content,
      mains,
    });
  }

  // --------------------------------------------------
  // SAISONANGEBOT
  // --------------------------------------------------

  function updateSeasonalDish(
    index: number,
    field: keyof SeasonalDish,
    value: any
  ) {
    const offer = offers.find(
      (item) => item.slug === "pfifferlinge"
    );

    if (!offer) return;

    const dishes: SeasonalDish[] = [
      ...(offer.content?.dishes || []),
    ];

    dishes[index] = {
      ...dishes[index],
      [field]: value,
    };

    updateOfferContent("pfifferlinge", {
      ...offer.content,
      dishes,
    });
  }

  function addSeasonalDish() {
    const offer = offers.find(
      (item) => item.slug === "pfifferlinge"
    );

    if (!offer) return;

    const dishes: SeasonalDish[] = [
      ...(offer.content?.dishes || []),
      {
        name: "Neues Saison-Gericht",
        description: "",
        price: null,
      },
    ];

    updateOfferContent("pfifferlinge", {
      ...offer.content,
      dishes,
    });
  }

  function deleteSeasonalDish(index: number) {
    const offer = offers.find(
      (item) => item.slug === "pfifferlinge"
    );

    if (!offer) return;

    const dishes: SeasonalDish[] = [
      ...(offer.content?.dishes || []),
    ];

    dishes.splice(index, 1);

    updateOfferContent("pfifferlinge", {
      ...offer.content,
      dishes,
    });
  }

  // --------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d1823] flex items-center justify-center text-white">
        <p>Adminbereich wird geladen ...</p>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#0d1823] flex items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl"
        >
          <p className="text-[#b58a3a] uppercase tracking-[0.25em] text-sm font-semibold mb-2">
            Restaurant Adria
          </p>

          <h1 className="text-3xl font-bold text-[#111827] mb-2">
            Admin Login
          </h1>

          <p className="text-gray-500 mb-7">
            Website, Speisekarte und Angebote verwalten.
          </p>

          <label className="block mb-4">
            <span className="block font-semibold mb-2">
              E-Mail
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </label>

          <label className="block mb-5">
            <span className="block font-semibold mb-2">
              Passwort
            </span>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[#b58a3a] text-white font-bold py-3"
          >
            {busy ? "Bitte warten ..." : "Anmelden"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-gray-700">
              {message}
            </p>
          )}

          <a
            href="/"
            className="block text-center mt-6 text-gray-500"
          >
            ← Zur Website
          </a>
        </form>
      </main>
    );
  }

  const visibleMenu =
    selectedCategory === "Alle"
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category === selectedCategory
        );

  const ladiesOffer = offers.find(
    (item) => item.slug === "damenabend"
  );

  const seasonalOffer = offers.find(
    (item) => item.slug === "pfifferlinge"
  );

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#17202a]">
      <header className="bg-[#0d1823] text-white px-5 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[#d2aa5d] text-sm uppercase tracking-[0.2em]">
              Restaurant Adria
            </p>

            <h1 className="text-2xl font-bold">
              Website Verwaltung
            </h1>
          </div>

          <div className="flex gap-3">
            <a
              href="/"
              target="_blank"
              className="border border-white/30 rounded-xl px-4 py-2"
            >
              Website ansehen
            </a>

            <button
              onClick={logout}
              className="bg-[#b58a3a] rounded-xl px-4 py-2 font-semibold"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {message && (
          <div className="mb-6 bg-white border border-[#d9c79e] rounded-xl px-5 py-4 shadow-sm">
            {message}
          </div>
        )}

        {/* BILDER */}

        <section className="bg-white rounded-2xl p-5 md:p-7 shadow-sm mb-8">
          <div className="mb-6">
            <p className="text-[#b58a3a] uppercase tracking-widest text-sm font-semibold">
              Website
            </p>

            <h2 className="text-2xl font-bold">
              Bilder bearbeiten
            </h2>

            <p className="text-gray-500 mt-1">
              Hier kannst du die Bilder auf der Website austauschen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {imageSlots.map((slot) => (
              <div
                key={slot.key}
                className="border border-gray-200 rounded-2xl p-4"
              >
                <h3 className="font-bold mb-3">
                  {slot.label}
                </h3>

                <div className="h-44 rounded-xl bg-gray-100 overflow-hidden mb-4">
                  {settings[slot.key] ? (
                    <img
                      src={settings[slot.key]}
                      alt={slot.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Noch kein Bild
                    </div>
                  )}
                </div>

                <label className="block cursor-pointer text-center rounded-xl bg-[#0d1823] text-white px-4 py-3 font-semibold">
                  Neues Bild auswählen

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={busy}
                    onChange={(event) =>
                      uploadImage(
                        slot.key,
                        event.target.files?.[0]
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* SPEISEKARTE */}

        <section className="bg-white rounded-2xl p-5 md:p-7 shadow-sm mb-8">
          <div className="flex flex-wrap justify-between gap-4 items-end mb-6">
            <div>
              <p className="text-[#b58a3a] uppercase tracking-widest text-sm font-semibold">
                Restaurant
              </p>

              <h2 className="text-2xl font-bold">
                Speisekarte
              </h2>

              <p className="text-gray-500 mt-1">
                Namen, Beschreibungen und Preise direkt ändern.
              </p>
            </div>

            <button
              onClick={addMenuItem}
              disabled={busy}
              className="bg-[#b58a3a] text-white rounded-xl px-5 py-3 font-bold"
            >
              + Gericht hinzufügen
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
            <button
              onClick={() =>
                setSelectedCategory("Alle")
              }
              className={`whitespace-nowrap rounded-full px-4 py-2 ${
                selectedCategory === "Alle"
                  ? "bg-[#0d1823] text-white"
                  : "bg-gray-100"
              }`}
            >
              Alle
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`whitespace-nowrap rounded-full px-4 py-2 ${
                  selectedCategory === category
                    ? "bg-[#0d1823] text-white"
                    : "bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {visibleMenu.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-2xl p-5"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <label>
                    <span className="block text-sm font-bold mb-1">
                      Gericht
                    </span>

                    <input
                      value={item.name}
                      onChange={(event) =>
                        changeMenuItem(
                          item.id,
                          "name",
                          event.target.value
                        )
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </label>

                  <label>
                    <span className="block text-sm font-bold mb-1">
                      Kategorie
                    </span>

                    <select
                      value={item.category}
                      onChange={(event) =>
                        changeMenuItem(
                          item.id,
                          "category",
                          event.target.value
                        )
                      }
                      className="w-full border rounded-xl px-4 py-3 bg-white"
                    >
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="md:col-span-2">
                    <span className="block text-sm font-bold mb-1">
                      Beschreibung
                    </span>

                    <textarea
                      value={item.description || ""}
                      onChange={(event) =>
                        changeMenuItem(
                          item.id,
                          "description",
                          event.target.value
                        )
                      }
                      rows={2}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </label>

                  <label>
                    <span className="block text-sm font-bold mb-1">
                      Preis €
                    </span>

                    <input
                      type="number"
                      step="0.10"
                      value={item.price ?? ""}
                      onChange={(event) =>
                        changeMenuItem(
                          item.id,
                          "price",
                          event.target.value === ""
                            ? null
                            : Number(
                                event.target.value
                              )
                        )
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </label>

                  <label>
                    <span className="block text-sm font-bold mb-1">
                      Reihenfolge
                    </span>

                    <input
                      type="number"
                      value={item.sort_order ?? 0}
                      onChange={(event) =>
                        changeMenuItem(
                          item.id,
                          "sort_order",
                          Number(event.target.value)
                        )
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() =>
                      saveMenuItem(item)
                    }
                    disabled={busy}
                    className="bg-[#0d1823] text-white rounded-xl px-5 py-2.5 font-bold"
                  >
                    Speichern
                  </button>

                  <button
                    onClick={() =>
                      deleteMenuItem(item)
                    }
                    disabled={busy}
                    className="border border-red-300 text-red-600 rounded-xl px-5 py-2.5 font-semibold"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DAMENABEND */}

        {ladiesOffer && (
          <section className="bg-white rounded-2xl p-5 md:p-7 shadow-sm mb-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div>
                <p className="text-[#b58a3a] uppercase tracking-widest text-sm font-semibold">
                  Angebot
                </p>

                <h2 className="text-2xl font-bold">
                  Damenabend
                </h2>
              </div>

              <label className="flex items-center gap-3 font-bold">
                <input
                  type="checkbox"
                  checked={ladiesOffer.active}
                  onChange={(event) =>
                    updateOffer(
                      "damenabend",
                      "active",
                      event.target.checked
                    )
                  }
                  className="w-5 h-5"
                />

                Auf Website anzeigen
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label>
                <span className="block font-bold mb-1">
                  Titel
                </span>

                <input
                  value={ladiesOffer.title}
                  onChange={(event) =>
                    updateOffer(
                      "damenabend",
                      "title",
                      event.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label>
                <span className="block font-bold mb-1">
                  Untertitel
                </span>

                <input
                  value={ladiesOffer.subtitle || ""}
                  onChange={(event) =>
                    updateOffer(
                      "damenabend",
                      "subtitle",
                      event.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label className="md:col-span-2">
                <span className="block font-bold mb-1">
                  Text
                </span>

                <input
                  value={
                    ladiesOffer.description || ""
                  }
                  onChange={(event) =>
                    updateOffer(
                      "damenabend",
                      "description",
                      event.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label>
                <span className="block font-bold mb-1">
                  Preis pro Person €
                </span>

                <input
                  type="number"
                  step="0.10"
                  value={ladiesOffer.price ?? ""}
                  onChange={(event) =>
                    updateOffer(
                      "damenabend",
                      "price",
                      event.target.value === ""
                        ? null
                        : Number(
                            event.target.value
                          )
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label>
                <span className="block font-bold mb-1">
                  Aperitif
                </span>

                <input
                  value={
                    ladiesOffer.content?.aperitif ||
                    ""
                  }
                  onChange={(event) =>
                    updateOfferContent(
                      "damenabend",
                      {
                        ...ladiesOffer.content,
                        aperitif:
                          event.target.value,
                      }
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label className="md:col-span-2">
                <span className="block font-bold mb-1">
                  Salat
                </span>

                <input
                  value={
                    ladiesOffer.content?.salad || ""
                  }
                  onChange={(event) =>
                    updateOfferContent(
                      "damenabend",
                      {
                        ...ladiesOffer.content,
                        salad:
                          event.target.value,
                      }
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>
            </div>

            <div className="mt-7">
              <div className="flex justify-between items-center gap-3 mb-4">
                <h3 className="text-xl font-bold">
                  Hauptgerichte
                </h3>

                <button
                  onClick={addLadiesMain}
                  className="border border-[#b58a3a] text-[#8b6729] rounded-xl px-4 py-2 font-bold"
                >
                  + Hauptgericht
                </button>
              </div>

              <div className="space-y-4">
                {(
                  ladiesOffer.content?.mains ||
                  []
                ).map(
                  (
                    main: MainDish,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4"
                    >
                      <input
                        value={main.name || ""}
                        onChange={(event) =>
                          updateLadiesMain(
                            index,
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Gericht"
                        className="w-full border rounded-xl px-4 py-3 mb-3 font-semibold"
                      />

                      <textarea
                        value={
                          main.description || ""
                        }
                        onChange={(event) =>
                          updateLadiesMain(
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        placeholder="Beschreibung"
                        rows={2}
                        className="w-full border rounded-xl px-4 py-3"
                      />

                      <button
                        onClick={() =>
                          deleteLadiesMain(
                            index
                          )
                        }
                        className="mt-3 text-red-600 font-semibold"
                      >
                        Gericht entfernen
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            <button
              onClick={() =>
                saveOffer(ladiesOffer)
              }
              disabled={busy}
              className="mt-6 bg-[#b58a3a] text-white rounded-xl px-6 py-3 font-bold"
            >
              Damenabend speichern
            </button>
          </section>
        )}

        {/* SAISONANGEBOT */}

        {seasonalOffer && (
          <section className="bg-white rounded-2xl p-5 md:p-7 shadow-sm mb-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div>
                <p className="text-[#b58a3a] uppercase tracking-widest text-sm font-semibold">
                  Angebot
                </p>

                <h2 className="text-2xl font-bold">
                  Saisonangebot
                </h2>
              </div>

              <label className="flex items-center gap-3 font-bold">
                <input
                  type="checkbox"
                  checked={seasonalOffer.active}
                  onChange={(event) =>
                    updateOffer(
                      "pfifferlinge",
                      "active",
                      event.target.checked
                    )
                  }
                  className="w-5 h-5"
                />

                Auf Website anzeigen
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label>
                <span className="block font-bold mb-1">
                  Titel
                </span>

                <input
                  value={seasonalOffer.title}
                  onChange={(event) =>
                    updateOffer(
                      "pfifferlinge",
                      "title",
                      event.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label>
                <span className="block font-bold mb-1">
                  Untertitel
                </span>

                <input
                  value={
                    seasonalOffer.subtitle || ""
                  }
                  onChange={(event) =>
                    updateOffer(
                      "pfifferlinge",
                      "subtitle",
                      event.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label className="md:col-span-2">
                <span className="block font-bold mb-1">
                  Beschreibung
                </span>

                <input
                  value={
                    seasonalOffer.description ||
                    ""
                  }
                  onChange={(event) =>
                    updateOffer(
                      "pfifferlinge",
                      "description",
                      event.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>

              <label className="md:col-span-2">
                <span className="block font-bold mb-1">
                  Hinweis
                </span>

                <input
                  value={
                    seasonalOffer.content?.note ||
                    ""
                  }
                  onChange={(event) =>
                    updateOfferContent(
                      "pfifferlinge",
                      {
                        ...seasonalOffer.content,
                        note: event.target.value,
                      }
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </label>
            </div>

            <div className="mt-7">
              <div className="flex justify-between items-center gap-3 mb-4">
                <h3 className="text-xl font-bold">
                  Saison-Gerichte
                </h3>

                <button
                  onClick={addSeasonalDish}
                  className="border border-[#b58a3a] text-[#8b6729] rounded-xl px-4 py-2 font-bold"
                >
                  + Gericht
                </button>
              </div>

              <div className="space-y-4">
                {(
                  seasonalOffer.content?.dishes ||
                  []
                ).map(
                  (
                    dish: SeasonalDish,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4"
                    >
                      <div className="grid md:grid-cols-[1fr_160px] gap-3">
                        <input
                          value={dish.name || ""}
                          onChange={(event) =>
                            updateSeasonalDish(
                              index,
                              "name",
                              event.target.value
                            )
                          }
                          placeholder="Gericht"
                          className="w-full border rounded-xl px-4 py-3 font-semibold"
                        />

                        <input
                          type="number"
                          step="0.10"
                          value={
                            dish.price ?? ""
                          }
                          onChange={(event) =>
                            updateSeasonalDish(
                              index,
                              "price",
                              event.target.value ===
                                ""
                                ? null
                                : Number(
                                    event.target
                                      .value
                                  )
                            )
                          }
                          placeholder="Preis €"
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                      <textarea
                        value={
                          dish.description || ""
                        }
                        onChange={(event) =>
                          updateSeasonalDish(
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        placeholder="Beschreibung"
                        rows={2}
                        className="w-full border rounded-xl px-4 py-3 mt-3"
                      />

                      <button
                        onClick={() =>
                          deleteSeasonalDish(
                            index
                          )
                        }
                        className="mt-3 text-red-600 font-semibold"
                      >
                        Gericht entfernen
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            <button
              onClick={() =>
                saveOffer(seasonalOffer)
              }
              disabled={busy}
              className="mt-6 bg-[#b58a3a] text-white rounded-xl px-6 py-3 font-bold"
            >
              Saisonangebot speichern
            </button>
          </section>
        )}
      </div>
    </main>
  );
}