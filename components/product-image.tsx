"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

// Isolate late load/error events from a previous color in its own request.
export default function ProductImage(props: ImageProps) {
  const source = typeof props.src === "string" ? props.src : JSON.stringify(props.src);
  return <PhotoRequest key={source} {...props} />;
}

function PhotoRequest({ className = "", style, onLoad, onError, ...props }: ImageProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">(props.src ? "loading" : "unavailable");
  return (
    <span className={`product-photo ${className}`} data-photo-state={status} aria-busy={status === "loading"} style={style}>
      {props.src && <Image {...props} className="product-photo-image"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
        aria-hidden={status !== "ready"}
        onLoad={(event) => { setStatus("ready"); onLoad?.(event); }}
        onError={(event) => { setStatus("unavailable"); onError?.(event); }}
      />}
      {status === "loading" && <span className="photo-loading" aria-hidden="true" />}
      {status === "unavailable" && <span className="photo-fallback" role="img" aria-label={`Photo unavailable: ${props.alt || "this product"}`}>
        <ImageOff size={25} strokeWidth={1.2} />
        <span>Photo unavailable<span className="photo-fallback-detail">{props.alt || "For this finish"}</span></span>
      </span>}
    </span>
  );
}
