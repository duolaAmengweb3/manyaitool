"use client";

import { useState, useEffect, useCallback } from "react";

export function usePersistedState<T>(key: string, defaultValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`manyaitool:${key}`);
      if (stored) setValue(JSON.parse(stored));
    } catch {}
  }, [key]);

  const setPersisted = useCallback(
    (v: T) => {
      setValue(v);
      try {
        localStorage.setItem(`manyaitool:${key}`, JSON.stringify(v));
      } catch {}
    },
    [key]
  );

  return [value, setPersisted];
}

export function useRecentTools() {
  const [recent, setRecent] = usePersistedState<string[]>("recent-tools", []);

  const addRecent = useCallback(
    (slug: string) => {
      setRecent([slug, ...recent.filter((s) => s !== slug)].slice(0, 6));
    },
    [recent, setRecent]
  );

  return { recent, addRecent };
}

export function useFavorites() {
  const [favorites, setFavorites] = usePersistedState<string[]>("favorites", []);

  const toggleFavorite = useCallback(
    (slug: string) => {
      setFavorites(
        favorites.includes(slug)
          ? favorites.filter((s) => s !== slug)
          : [...favorites, slug]
      );
    },
    [favorites, setFavorites]
  );

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}

export function useDarkMode() {
  const [dark, setDark] = usePersistedState<boolean | null>("dark-mode", null);

  useEffect(() => {
    const isDark =
      dark === null
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : dark;
    document.documentElement.classList.toggle("dark", isDark);
  }, [dark]);

  const toggle = useCallback(() => {
    const current = dark === null
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : dark;
    setDark(!current);
  }, [dark, setDark]);

  const isDark = dark === null
    ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    : dark;

  return { isDark, toggle };
}
