"use client";

import { m } from "framer-motion";
import { publicPath } from "@/lib/public-path";
import { useId, type CSSProperties } from "react";

export function HorseMark() {
  const cutout = useId();
  const source = {
    "--horse-source": `url("${publicPath("/images/ershov-horse.jpg")}")`,
  } as CSSProperties;

  return (
    <span className="horse-mark" style={source} aria-hidden="true">
      <svg className="horse-filters" width="0" height="0" focusable="false">
        <filter id={cutout} colorInterpolationFilters="sRGB">
          {/* Use the cream paper's luminance to create an alpha mask. */}
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    -1.9134 -6.4368 -0.6498 0 8.1"
            result="paperCutout"
          />
          <feComposite in="SourceGraphic" in2="paperCutout" operator="in" />
        </filter>
      </svg>
      <span className="horse-travel">
        <span className="horse-trot" style={{ filter: `url("#${cutout}")` }}>
          <span className="horse-art horse-art-rear" />
          <span className="horse-art horse-art-front" />
          <span className="horse-art horse-art-body" />
        </span>
      </span>
    </span>
  );
}

export function HorseAppears({ className }: { className?: string }) {
  return (
    <m.span
      className={`horse-appearance ${className ?? ""}`}
      aria-hidden="true"
      initial={{ opacity: 0, x: -24, y: 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.5 }}
    >
      <HorseMark />
    </m.span>
  );
}
