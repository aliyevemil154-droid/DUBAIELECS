"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Zap } from "lucide-react";
import { useLanguage } from "./language-provider";
import LanguageSwitcher from "./language-switcher";

export default function PolicyContent({
  policy,
  document,
}: {
  policy: string;
  document: { title: string; intro: string; sections: [string, string][] };
}) {
  const { t } = useLanguage();
  return (
    <>
      <header className="policy-header container">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Zap size={24} fill="currentColor" />
          </span>
          <span>
            dubai<span className="brand-sub">ELECTRONICS</span>
          </span>
        </Link>
        <div className="policy-header-actions">
          <LanguageSwitcher />
          <Link className="text-link" href="/">
            <ArrowLeft size={15} /> {t("Back to the collection")}
          </Link>
        </div>
      </header>
      <main className="policy-main container">
        <p className="eyebrow">{t("DUBAI ELECTRONICS · INFORMATION")}</p>
        <h1>{t(document.title)}</h1>
        <p className="policy-intro">{t(document.intro)}</p>
        <nav className="policy-nav" aria-label={t("Policy documents")}>
          {["shipping", "returns", "privacy", "terms"].map((name) => (
            <Link
              key={name}
              href={`/policies/${name}`}
              aria-current={name === policy ? "page" : undefined}
            >
              {name === "returns"
                ? t("Returns & warranty")
                : t(name[0].toUpperCase() + name.slice(1))}
            </Link>
          ))}
        </nav>
        {document.sections.map(([title, body]) => (
          <section key={title}>
            <h2>{t(title)}</h2>
            <p>{t(body)}</p>
          </section>
        ))}
        <Link className="button button-dark" href="/">
          {t("Find your next upgrade")} <ArrowUpRight size={17} />
        </Link>
      </main>
      <footer className="policy-footer container">
        © {new Date().getFullYear()} Dubai Electronics. {t("Dubai to Baku")}.
      </footer>
    </>
  );
}
