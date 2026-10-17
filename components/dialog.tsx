"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "./language-provider";
import { X } from "lucide-react";

export default function Dialog({
  children,
  onClose,
  drawer = false,
  className = "",
  id,
}: {
  children: React.ReactNode;
  onClose: () => void;
  drawer?: boolean;
  className?: string;
  id?: string;
}) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const focusable = () =>
    Array.from(
      ref.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select, textarea, [tabindex="0"]',
      ) ?? [],
    ).filter((el) => el.getClientRects().length > 0);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    (
      ref.current?.querySelector<HTMLElement>("[data-autofocus]") ??
      focusable()[0]
    )?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      document.documentElement.style.overflow = htmlOverflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  const onKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeRef.current();
    }
    if (event.key === "Tab") {
      const items = focusable();
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div
      className={`dialog-overlay ${drawer ? "is-drawer" : ""}`}
      onClick={onClose}
    >
      <div
        ref={ref}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`dialog-panel ${className}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKey}
      >
        <button
          className="icon-button dialog-close"
          aria-label={t("Close dialog")}
          onClick={onClose}
        >
          <X size={21} />
        </button>
        {children}
      </div>
    </div>
  );
}
