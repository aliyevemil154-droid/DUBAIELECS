"use client";

import { useLanguage } from "./language-provider";
import Select from "./select";
import { languages, type Language } from "@/lib/i18n";

export default function LanguageSwitcher({
  segmented = false,
}: {
  segmented?: boolean;
}) {
  const { language, setLanguage, t } = useLanguage();
  if (segmented)
    return (
      <div
        className="language-options"
        role="group"
        aria-label={t("Website language")}
      >
        {languages.map((option) => (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-label={option.name}
            aria-pressed={language === option.value}
            onClick={() => setLanguage(option.value)}
          >
            <span>{option.code}</span>
            <small>{option.shortName}</small>
          </button>
        ))}
      </div>
    );
  return (
    <div className="language-switcher">
      <Select
        compact
        label={t("Website language")}
        value={language}
        onChange={(value) => setLanguage(value as Language)}
        options={languages.map((option) => ({
          value: option.value,
          label: option.code,
          description: option.name,
        }))}
      />
    </div>
  );
}
