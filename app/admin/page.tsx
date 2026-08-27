"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (password === "Adria2026") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Falsches Passwort");
    }
  }

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#061a3a] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-[#d6b15c]/30 bg-[#03142e] p-8 shadow-2xl">
          <p className="text-center text-xs uppercase tracking-[0.35em] text-[#d6b15c]">
            Restaurant Adria
          </p>

          <h1 className="mt-4 text-center font-serif text-4xl">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="mt-8">
            <label className="text-sm text-white/60">
              Passwort
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#d6b15c]/30 bg-[#061a3a] px-4 py-3 outline-none focus:border-[#d6b15c]"
              placeholder="Passwort eingeben"
            />

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#d6b15c] px-5 py-3 font-semibold text-[#061a3a]"
            >
              Anmelden
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#061a3a] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-[#d6b15c]/30 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#d6b15c]">
              Restaurant Adria
            </p>

            <h1 className="mt-2 font-serif text-4xl">
              Admin-Bereich
            </h1>
          </div>

          <a
            href="/"
            className="rounded-full border border-[#d6b15c] px-5 py-2 text-center text-sm text-[#d6b15c]"
          >
            Website ansehen
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AdminCard
            title="Speisekarte"
            description="Gerichte, Preise und Beschreibungen bearbeiten"
          />

          <AdminCard
            title="Saisonangebote"
            description="Aktuelle saisonale Angebote ändern"
          />

          <AdminCard
            title="Damenabend"
            description="Preis, Menü und Texte bearbeiten"
          />

          <AdminCard
            title="Essensbilder"
            description="Bilder hochladen und verwalten"
          />

          <AdminCard
            title="Öffnungszeiten"
            description="Öffnungszeiten und Ruhetag ändern"
          />

          <AdminCard
            title="Restaurantdaten"
            description="Telefon, Adresse und weitere Daten ändern"
          />
        </div>

        <button
          onClick={() => setLoggedIn(false)}
          className="mt-10 rounded-full border border-white/20 px-5 py-2 text-sm text-white/60"
        >
          Abmelden
        </button>
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
    <button
      type="button"
      className="rounded-3xl border border-[#d6b15c]/25 bg-[#03142e] p-7 text-left transition hover:border-[#d6b15c]"
    >
      <h2 className="font-serif text-2xl text-[#d6b15c]">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-white/55">
        {description}
      </p>

      <p className="mt-6 text-sm text-[#d6b15c]">
        Bearbeiten →
      </p>
    </button>
  );
}