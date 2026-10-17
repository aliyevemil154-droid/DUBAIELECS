"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string; description?: string };
export default function Select({
  label,
  value,
  options,
  onChange,
  compact = false,
  placement = "bottom",
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  compact?: boolean;
  placement?: "top" | "bottom";
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [active, setActive] = useState(selected);
  const typeahead = useRef("");
  const typedAt = useRef(0);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const item = document.getElementById(`${id}-${active}`);
    const list = item?.closest("ul");
    if (!item || !list) return;
    // Scroll only the option list. scrollIntoView can pan the whole mobile drawer.
    const itemBounds = item.getBoundingClientRect();
    const listBounds = list.getBoundingClientRect();
    if (itemBounds.top < listBounds.top)
      list.scrollTop -= listBounds.top - itemBounds.top;
    else if (itemBounds.bottom > listBounds.bottom)
      list.scrollTop += itemBounds.bottom - listBounds.bottom;
  }, [open, active, id]);
  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
    root.current
      ?.querySelector<HTMLButtonElement>(".select-trigger")
      ?.focus({ preventScroll: true });
  }
  function keydown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!open) {
        setActive(selected);
        setOpen(true);
        return;
      }
      setActive((current) =>
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? last
            : event.key === "ArrowDown"
              ? (current + 1) % options.length
              : (current + last) % options.length,
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else {
        setActive(selected);
        setOpen(true);
      }
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Tab") setOpen(false);
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      if (Date.now() - typedAt.current > 600) typeahead.current = "";
      typedAt.current = Date.now();
      typeahead.current += event.key.toLowerCase();
      const index = options.findIndex((option) =>
        option.label.toLowerCase().startsWith(typeahead.current),
      );
      if (index >= 0) {
        setActive(index);
        setOpen(true);
      }
    }
  }
  return (
    <div
      ref={root}
      className={`custom-select ${compact ? "compact-select" : ""} select-opens-${placement}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        role="combobox"
        className="select-trigger"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        onKeyDown={keydown}
        onClick={() => {
          setActive(selected);
          setOpen(!open);
        }}
      >
        <span>{options[selected]?.label}</span>
        <ChevronDown size={15} className={open ? "rotated" : ""} />
      </button>
      {open && (
        <div className="select-popover">
          <p className="select-caption">{label}</p>
          <ul id={`${id}-list`} role="listbox" aria-label={label}>
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-${index}`}
                role="option"
                aria-selected={option.value === value}
                className={index === active ? "option-active" : ""}
                onPointerMove={() => setActive(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
              >
                <span>
                  {option.label}
                  {option.description && <small>{option.description}</small>}
                </span>
                {option.value === value && <Check size={15} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
