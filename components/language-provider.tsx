"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  LANGUAGE_KEY,
  isLanguage,
  translate,
  type Language,
  type TranslationValues,
} from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (source: string, values?: TranslationValues) => string;
};
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server and the first client render both use Azerbaijani.
  const [language, updateLanguage] = useState<Language>("az");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (isLanguage(saved)) updateLanguage(saved);
    } catch {
      /* Language selection also works when storage is unavailable. */
    }
    const sync = (event: StorageEvent) => {
      if (event.key === LANGUAGE_KEY)
        updateLanguage(isLanguage(event.newValue) ? event.newValue : "az");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try {
      localStorage.setItem(LANGUAGE_KEY, next);
    } catch {
      /* Optional persistence. */
    }
  }, []);
  const t = useCallback(
    (source: string, values?: TranslationValues) =>
      translate(source, language, values),
    [language],
  );
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required.");
  return context;
}

export function LocalizedText({ children }: { children: string }) {
  const { t } = useLanguage();
  return t(children);
}
