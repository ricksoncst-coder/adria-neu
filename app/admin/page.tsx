"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

const imageSlots = [
  {
    key: "hero_image",
    title: "Startseiten-Hintergrund",
    description: "Das große Hintergrundbild oben auf der Website",
  },
  {
    key: "restaurant_image_1",
    title: "Restaurantbild 1",
    description: "Gastraum / Backsteinbögen",
  },
  {
    key: "restaurant_image_2",
    title: "Restaurantbild 2",
    description: "Weinwand",
  },
  {
    key: "restaurant_image_3",
    title: "Restaurantbild 3",
    description: "Theke / Bar",
  },
  {
    key: "restaurant_image_4",
    title: "Restaurantbild 4",
    description: "Außenbereich / Terrasse",
  },
];

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setLoggedIn(true);
      await loadImages();
    }

    setLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-Mail oder Passwort ist falsch.");
      return;
    }

    setLoggedIn(true);
    await loadImages();
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setImages({});
    setMessage("");
    setError("");
  }

  async function loadImages() {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key,value");

    if (error) {
      console.error(error);
      setError("Die gespeicherten Bilder konnten nicht geladen werden.");
      return;
    }

    const result: Record<string, string> = {};

    data?.forEach((item) => {
      result[item.key] = item.value;
    });

    setImages(result);
  }

  async function uploadImage(key: string, file: File) {
    try {
      setUploading(key);
      setMessage("");
      setError("");

      if (file.size > 8 * 1024 * 1024) {
        setError("Das Bild ist zu groß. Bitte maximal 8 MB verwenden.");
        return;
      }

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${key}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("website-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-images")
        .getPublicUrl(fileName);

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

      setImages((current) => ({
        ...current,
        [key]: publicUrl,
      }));

      setMessage("Bild wurde erfolgreich gespeichert.");
    } catch (err) {
      console.error(err);
      setError("Das Bild konnte nicht gespeichert werden.");
    } finally {
      setUploading(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111c] text-white">
        <p className="text-[#d4a437]">Wird geladen...</p>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111c] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-[#d4a437]/30 bg-[#0c1722] p-8 shadow-2xl">
          <p className="text-center text-xs uppercase tracking-[0.35em] text-[#d4a437]">
            Restaurant Adria
          </p>

          <h1 className="mt-4 text-center font-serif text-4xl">
            Admin Login
          </h1>

          <p className="mt-3 text-center text-sm text-white/45">
            Melde dich an, um die Website zu bearbeiten.
          </p>

          <form onSubmit={handleLogin} className="mt-8">
            <label className="text-sm text-white/60">
              E-Mail
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#07111c] px-4 py-3 outline-none focus:border-[#d4a437]"
              placeholder="E-Mail-Adresse"
            />

            <label className="mt-5 block text-sm text-white/60">
              Passwort
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#07111c] px-4 py-3 outline-none focus:border-[#d4a437]"
              placeholder="Passwort"
            />

            {error && (
              <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#d4a437] px-5 py-3 font-semibold text-black transition hover:bg-[#e5b84d]"
            >
              Anmelden
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111c] px-5 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* KOPF */}

        <header className="flex flex-col gap-5 border-b border-[#d4a437]/25 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#d4a437]">
              Restaurant Adria
            </p>

            <h1 className="mt-2 font-serif text-4xl">
              Admin-Bereich
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Website verwalten
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[#d4a437] px-5 py-3 text-sm text-[#d4a437]"
            >
              Website ansehen
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-white/20 px-5 py-3 text-sm text-white/60"
            >
              Abmelden
            </button>
          </div>
        </header>

        {/* MELDUNGEN */}

        {message && (
          <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* BILDER */}

        <section className="mt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a437]">
            Bilder
          </p>

          <h2 className="mt-2 font-serif text-3xl">
            Website-Bilder verwalten
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Hier kannst du das Hintergrundbild und die Restaurantbilder
            austauschen. Nach dem Hochladen wird das neue Bild gespeichert.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {imageSlots.map((slot) => (
              <div
                key={slot.key}
                className="overflow-hidden rounded-3xl border border-[#d4a437]/20 bg-[#0c1722]"
              >
                <div className="flex h-64 items-center justify-center overflow-hidden bg-black/30">

                  {images[slot.key] ? (
                    <img
                      src={images[slot.key]}
                      alt={slot.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="px-6 text-center">
                      <p className="text-sm text-white/30">
                        Noch kein neues Bild hochgeladen
                      </p>

                      <p className="mt-2 text-xs text-white/20">
                        Das bisherige Bild der Website bleibt erhalten.
                      </p>
                    </div>
                  )}

                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl text-[#d4a437]">
                    {slot.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    {slot.description}
                  </p>

                  <label
                    className={`mt-5 block rounded-xl px-5 py-3 text-center text-sm font-semibold ${
                      uploading === slot.key
                        ? "cursor-wait bg-[#d4a437]/50 text-black/60"
                        : "cursor-pointer bg-[#d4a437] text-black hover:bg-[#e5b84d]"
                    }`}
                  >
                    {uploading === slot.key
                      ? "Bild wird hochgeladen..."
                      : "Bild auswählen und hochladen"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      disabled={uploading !== null}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          uploadImage(slot.key, file);
                        }

                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* WEITERE ADMIN BEREICHE */}

        <section className="mt-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a437]">
            Weitere Einstellungen
          </p>

          <h2 className="mt-2 font-serif text-3xl">
            Restaurant verwalten
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AdminCard
              title="Speisekarte"
              description="Gerichte, Preise und Beschreibungen bearbeiten"
            />

            <AdminCard
              title="Saisonangebote"
              description="Aktuelle saisonale Angebote bearbeiten"
            />

            <AdminCard
              title="Damenabend"
              description="Preis und Gerichte des Damenabends bearbeiten"
            />

            <AdminCard
              title="Öffnungszeiten"
              description="Öffnungszeiten und Ruhetag ändern"
            />

            <AdminCard
              title="Restaurantdaten"
              description="Telefonnummer, Adresse und weitere Daten ändern"
            />
          </div>
        </section>

      </div>
    </main>
  );
}

function AdminCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-[#d4a437]/20 bg-[#0c1722] p-6">
      <h3 className="font-serif text-2xl text-[#d4a437]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/50">
        {description}
      </p>

      <p className="mt-6 text-xs uppercase tracking-wider text-white/25">
        Als Nächstes
      </p>
    </div>
  );
}