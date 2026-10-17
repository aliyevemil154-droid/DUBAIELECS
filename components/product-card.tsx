"use client";

import { useLanguage } from "@/components/language-provider";

import { type CSSProperties } from "react";
import { ArrowUpRight, Heart, Plus, Sparkles } from "lucide-react";
import { discountPercent, variantProduct, type Product } from "@/lib/catalog";
import ProductImage from "./product-image";

interface ProductCardProps {
  product: Product;
  colorIndex: number;
  saved: boolean;
  formatPrice: (amount: number) => string;
  onColorChange: (index: number) => void;
  onOpen: () => void;
  onFavorite: () => void;
  onAdd: (variant: Product) => void;
}

export default function ProductCard({
  product,
  colorIndex,
  saved,
  formatPrice,
  onColorChange,
  onOpen,
  onFavorite,
  onAdd,
}: ProductCardProps) {
  const { t } = useLanguage();
  const index = product.colors[colorIndex] ? colorIndex : 0;
  const color = product.colors[index];
  const storage = Math.max(
    0,
    product.storage?.findIndex((option) => option.available) ?? 0,
  );
  const variant = variantProduct(product, storage, index);
  const discount = discountPercent(variant);
  return (
    <article className="product-card" data-product-id={product.id}>
      <div className="product-visual">
        {(discount > 0 || product.badge) && (
          <span
            className={`product-badge ${discount ? "sale-badge" : "arrival-badge"}`}
          >
            <Sparkles size={11} />
            {discount
              ? t("{percent}% OFF", { percent: discount })
              : t(product.badge ?? "")}
          </span>
        )}
        <button
          type="button"
          className={`favorite-button ${saved ? "is-saved" : ""}`}
          onClick={onFavorite}
          aria-label={t(
            saved
              ? "Remove {product} from wishlist"
              : "Save {product} to wishlist",
            { product: product.name },
          )}
          aria-pressed={saved}
        >
          <Heart size={18} />
        </button>
        <button
          type="button"
          className="product-image-button"
          onClick={onOpen}
          aria-label={t("View {product}", { product: product.name })}
        >
          <ProductImage
            src={variant.image}
            alt={t("{product} in {color}", {
              product: product.name,
              color: t(color.name),
            })}
            width={640}
            height={640}
            sizes="(max-width: 600px) 44vw, (max-width: 1000px) 30vw, 280px"
            className="product-image"
          />
        </button>
        <div className="product-labels">
          {product.registration && (
            <span className="registration-label">{product.registration}</span>
          )}
          {product.stock !== undefined && (
            <span className="stock-label">
              {t("Only {count} left in stock", { count: product.stock })}
            </span>
          )}
        </div>
        <button type="button" className="quick-view" onClick={onOpen}>
          {t("A closer look")} <ArrowUpRight size={14} />
        </button>
      </div>
      <div className="product-info">
        <p className="product-category">{t(product.category)}</p>
        <button type="button" className="product-name" onClick={onOpen}>
          {product.name}
        </button>
        <p className="product-subtitle">{t(variant.subtitle)}</p>
        <div className="product-finishes">
          <div
            className="color-dots"
            role="group"
            aria-label={t("{product} colors", { product: product.name })}
          >
            {product.colors.map((finish, finishIndex) => (
              <button
                type="button"
                className={`color-swatch ${index === finishIndex ? "selected" : ""}`}
                key={finish.name}
                style={{ "--swatch-color": finish.value } as CSSProperties}
                title={t(finish.name)}
                aria-label={`${product.name}: ${t(finish.name)}`}
                aria-pressed={index === finishIndex}
                onClick={() => onColorChange(finishIndex)}
              />
            ))}
          </div>
          <span className="color-label" aria-live="polite">
            {t(color.name)}
          </span>
        </div>
        <div className="product-bottom">
          <div className="product-pricing">
            <span className="product-price">{formatPrice(variant.price)}</span>
            {variant.originalPrice && (
              <del className="original-price">
                {formatPrice(variant.originalPrice)}
              </del>
            )}
          </div>
          <button
            type="button"
            className="add-button"
            aria-label={t("Add {product} to bag", { product: product.name })}
            disabled={variant.available === false}
            onClick={() => (product.storage ? onOpen() : onAdd(variant))}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
