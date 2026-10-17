"use client";

import { useLanguage } from "@/components/language-provider";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();
  return (
    <main className="error-page">
      <div>
        <p className="eyebrow">{t("A BRIEF PAUSE")}</p>
        <h1>
          {t("A little moment.")}
          <br />
          <span>{t("We’ll be right back.")}</span>
        </h1>
        <p>
          {t(
            "Something interrupted this page. Please try again to continue exploring.",
          )}
        </p>
        <button className="button button-dark" onClick={reset}>
          {t("Try again")}
        </button>
      </div>
    </main>
  );
}
