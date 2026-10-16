"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function ProductImage(props: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"] | null>(null);
  const failed = failedSource === props.src;
  return <>
    <Image {...props} style={{ ...props.style, ...(failed ? { opacity: 0 } : {}) }}
      onError={() => setFailedSource(props.src)} />
    {failed && <span className="photo-fallback" role="img" aria-label="Product photo temporarily unavailable"><ImageOff size={23} strokeWidth={1.3} /><span>Photo temporarily unavailable</span></span>}
  </>;
}
