"use client";
import Image from "next/image";
import { publicPath } from "@/lib/public-path";
import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import places from "@/content/locations.json";

export function Locations() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("");
  useEffect(() => {
    const select = (event: Event) =>
      setActive((event as CustomEvent<string>).detail);
    window.addEventListener("tobolsk:point", select);
    return () => window.removeEventListener("tobolsk:point", select);
  }, []);
  return (
    <Section id="locations" title="Места и истории">
      <div className="place-grid">
        {places.map((place) => (
          <m.article
            id={"place-" + place.id}
            key={place.id}
            className="place"
            data-active={active === place.id}
            whileHover={reduced ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {place.image && (
              <div className="place-photo">
                <Image
                  src={publicPath(place.image)}
                  alt={place.imageAlt ?? ""}
                  fill
                  unoptimized
                  sizes="(max-width: 650px) 95vw, (max-width: 1000px) 46vw, 30vw"
                />
              </div>
            )}
            <div className="place-copy">
              <h3>{place.title}</h3>
              <p className="place-area">{place.area}</p>
              <p>{place.text}</p>
              {place.coords && (
                <a
                  href="#map"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("tobolsk:point", { detail: place.id }),
                    )
                  }
                >
                  На карте ↗
                </a>
              )}
            </div>
          </m.article>
        ))}
      </div>
    </Section>
  );
}
