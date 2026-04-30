"use client";

import { useEffect } from "react";

/**
 * Při prvním načtení homepage zaručíme, že stránka začíná nahoře.
 *
 * Problém: `scroll-behavior: smooth` na `<html>` v kombinaci s hash v URL
 * (např. `/cs#kontakt` zůstávající z předchozího kliknutí na nav-link)
 * způsobuje, že browser po načtení sjede až dolů na footer.
 *
 * Řešení: po mountu odstraníme případný hash z URL a scrollneme na top.
 * Anchor scroll z navbaru funguje dál (Link href={`/${lang}#hero`}) protože
 * tato logika běží jen jednou na initial load (žádná závislost v efektu).
 */
export function ScrollResetOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Vypneme browserovou scroll restoration — jinak by browser obnovil
    // pozici z předchozí návštěvy.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      // Smaž hash bez triggernutí scrollu.
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
