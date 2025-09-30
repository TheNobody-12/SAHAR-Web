"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ur", label: "اردو" },
  { code: "ta", label: "தமிழ்" },
  { code: "ne", label: "नेपाली" },
];

export default function LanguageSwitcher() {
  const [ready, setReady] = useState(false);
  // Initialize safely for SSR; update after mount
  const [value, setValue] = useState<string>("en");

  // Inject Google Translate script once, and mount a hidden element to initialize it.
  useEffect(() => {
    if (document.getElementById("google-translate-script")) {
      setReady(true);
      return;
    }
    window.googleTranslateElementInit = function () {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,ur,ta,ne",
            autoDisplay: false,
          },
          "google_translate_element"
        );
        setReady(true);
      } catch {}
    };
    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    setValue(getCurrentLang());
  }, []);

  function getCurrentLang() {
    if (typeof document === "undefined") return "en";
    const m = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
    const v = m ? decodeURIComponent(m[1]) : "";
    const code = v.split("/").pop() || "en";
    return ["en", "hi", "ur", "ta", "ne"].includes(code) ? code : "en";
  }

  function setCookie(name: string, value: string) {
    const domain = window.location.hostname;
    const cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    document.cookie = cookie;
    document.cookie = `${cookie}; domain=.${domain}`;
  }

  function clearCookie(name: string) {
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain}`;
  }

  function applyGoogleCombo(lang: string) {
    const el = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (el) {
      el.value = lang;
      el.dispatchEvent(new Event("change"));
    }
  }

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value;
    setValue(lang);
    if (lang === "en") {
      clearCookie("googtrans");
      applyGoogleCombo("");
      return;
    }
    const val = encodeURIComponent(`/en/${lang}`);
    setCookie("googtrans", val);
    applyGoogleCombo(lang);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="lang" className="sr-only">Language</label>
      <select
        id="lang"
        aria-label="Select language"
        className="h-9 rounded-md border border-white/20 bg-transparent px-2 text-sm text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        value={value}
        onChange={onChange}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} className="text-gray-900">
            {l.label}
          </option>
        ))}
      </select>
      {/* Hidden container for the Google widget */}
      <div id="google_translate_element" className="hidden" aria-hidden={!ready} />
    </div>
  );
}
