"use client";

import { useEffect } from "react";
import {
  ArrowUpRight,
  Camera,
  ChevronRight,
  Gamepad2,
  Headphones,
  Heart,
  Laptop,
  LifeBuoy,
  Plane,
  Projector,
  Search,
  Smartphone,
  Tablet,
  Watch,
  Wind,
  Zap,
} from "lucide-react";
import { categories } from "@/lib/catalog";
import Dialog from "./dialog";
import LanguageSwitcher from "./language-switcher";
import { useLanguage } from "./language-provider";
import Select from "./select";

const icons = {
  Smartphones: Smartphone,
  Laptops: Laptop,
  Audio: Headphones,
  Tablets: Tablet,
  Gaming: Gamepad2,
  "Hair care": Wind,
  Cameras: Camera,
  Wearables: Watch,
  "Home cinema": Projector,
};
export default function MobileNavigation({
  currency,
  favorites,
  category,
  onCurrency,
  onBrowse,
  onOpen,
  onClose,
}: {
  currency: string;
  favorites: number;
  category: string;
  onCurrency: (value: string) => void;
  onBrowse: (category?: string) => void;
  onOpen: (destination: "search" | "delivery" | "support" | "wishlist") => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => {
      if (desktop.matches) onClose();
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [onClose]);
  return (
    <Dialog
      drawer
      id="mobile-navigation"
      className="mobile-menu"
      onClose={onClose}
    >
      <div className="mobile-menu-header">
        <div className="brand">
          <span className="brand-mark">
            <Zap size={24} fill="currentColor" strokeWidth={1.2} />
          </span>
          <span>
            dubai<span className="brand-sub">ELECTRONICS</span>
          </span>
        </div>
        <h2 id="modal-title" className="sr-only">
          {t("Mobile navigation")}
        </h2>
      </div>
      <div className="mobile-menu-content">
        <button
          type="button"
          className="mobile-menu-search"
          onClick={() => onOpen("search")}
        >
          <Search size={19} />
          <span>{t("Search the collection")}</span>
          <span className="mobile-search-arrow">
            <ArrowUpRight size={17} />
          </span>
        </button>
        <nav aria-label={t("Mobile navigation")}>
          <button
            type="button"
            className="mobile-shop-all"
            onClick={() => onBrowse()}
          >
            <span>
              <small>{t("EXPLORE THE COLLECTION")}</small>
              {t("Shop all")}
            </span>
            <span className="mobile-shop-arrow">
              <ArrowUpRight size={22} />
            </span>
          </button>
          <p className="mobile-section-label">{t("Shop by category")}</p>
          <div className="mobile-category-grid">
            {categories.map((name) => {
              const Icon = icons[name];
              return (
                <button
                  key={name}
                  type="button"
                  className={category === name ? "is-current" : ""}
                  aria-pressed={category === name}
                  onClick={() => onBrowse(name)}
                >
                  <span className="mobile-category-icon">
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                  <span>{t(name)}</span>
                  <ChevronRight size={14} />
                </button>
              );
            })}
          </div>
          <p className="mobile-section-label mobile-help-heading">
            {t("Here to help")}
          </p>
          <div className="mobile-utility-links">
            <button type="button" onClick={() => onOpen("wishlist")}>
              <Heart size={19} />
              <span>{t("Your favourites")}</span>
              <span className="mobile-favorite-count">{favorites}</span>
              <ChevronRight size={15} />
            </button>
            <button type="button" onClick={() => onOpen("delivery")}>
              <Plane size={19} />
              <span>{t("Shipping & delivery")}</span>
              <ChevronRight size={15} />
            </button>
            <button type="button" onClick={() => onOpen("support")}>
              <LifeBuoy size={19} />
              <span>{t("Get in touch")}</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </nav>
        <p className="mobile-route-note">
          <span className="live-dot" />
          {t("From Dubai, delivered with care to Baku.")}
        </p>
      </div>
      <div className="mobile-menu-settings">
        <div className="mobile-settings-heading">
          <span>{t("Website language")}</span>
          <span>{t("Display currency")}</span>
        </div>
        <div className="mobile-settings-controls">
          <LanguageSwitcher segmented />
          <Select
            compact
            placement="top"
            label={t("Display currency")}
            value={currency}
            onChange={onCurrency}
            options={[
              {
                value: "AZN",
                label: "AZN ₼",
                description: t("Azerbaijani manat"),
              },
              {
                value: "USD",
                label: "USD $",
                description: t("Indicative US dollar conversion"),
              },
              {
                value: "AED",
                label: "AED",
                description: t("Indicative UAE dirham conversion"),
              },
            ]}
          />
        </div>
      </div>
    </Dialog>
  );
}
