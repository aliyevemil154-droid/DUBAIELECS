"use client";

import { useLanguage } from "@/components/language-provider";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="error-page">
      <div>
        <p className="eyebrow">{t("A SMALL DETOUR")}</p>
        <h1>
          {t("Let’s get you")}
          <br />
          <span>{t("back to possibility.")}</span>
        </h1>
        <p>
          {t(
            "We couldn’t find that page. Your next great upgrade is still waiting in the collection.",
          )}
        </p>
        <Link className="button button-dark" href="/">
          {t("Back to the collection")} <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}
