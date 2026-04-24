"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await fetch(`${API_URL}/shortcuts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseUrl: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao encurtar a URL.");
        return;
      }

      setShortUrl(data.shortCut);
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setUrl("");
    setShortUrl("");
    setError("");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-zinc-900 p-4 pt-32">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20">
            <svg
              className="h-6 w-6 text-violet-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-zinc-100">
            Encurtador de URL
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Cole sua URL longa e receba um link curto
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-800 p-6 ring-1 ring-white/5">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemplo.com/minha-url-muito-longa"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3.5 pl-4 pr-10 text-base text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Limpar"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-zinc-500 transition hover:text-zinc-300"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 cursor-pointer rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-violet-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Encurtando
                </span>
              ) : (
                "Encurtar"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              {error}
            </div>
          )}

          {shortUrl && (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-violet-600/10 px-4 py-3 ring-1 ring-violet-500/20">
              <svg
                className="h-4 w-4 shrink-0 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-sm font-medium text-violet-300 hover:text-violet-100"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="shrink-0 cursor-pointer rounded-lg bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:bg-zinc-600 active:scale-95"
              >
                {copied ? "✓ Copiado" : "Copiar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
