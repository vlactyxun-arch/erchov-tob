"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import places from "@/content/locations.json";
import { PlaceEmblem } from "./PlaceEmblem";

export function Locations() {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [active, setActive] = useState("");

  useEffect(() => {
    const list = rail.current;
    if (!list) return;

    const updateEdges = () => {
      const start = list.scrollLeft <= 1;
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1;
      setEdges((current) =>
        current.start === start && current.end === end
          ? current
          : { start, end },
      );
    };
    const select = (event: Event) =>
      setActive((event as CustomEvent<string>).detail);
    const observer = new ResizeObserver(updateEdges);
    observer.observe(list);
    list.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("tobolsk:point", select);
    updateEdges();

    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", updateEdges);
      window.removeEventListener("tobolsk:point", select);
    };
  }, []);

  function move(direction: -1 | 1) {
    const list = rail.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    list.scrollBy({
      left:
        direction *
        Math.max(card.clientWidth, list.clientWidth - card.clientWidth),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    <section
      id="locations"
      className="section"
      aria-labelledby="locations-title"
    >
      <div className="wrap">
        <Reveal>
          <div className="places-header">
            <h2 id="locations-title">Места и объекты</h2>
            <div className="places-controls">
              <Button
                isIconOnly
                isDisabled={edges.start}
                className="button-outline"
                aria-label="Предыдущие места"
                aria-controls="places-rail"
                onPress={() => move(-1)}
              >
                <span aria-hidden="true">←</span>
              </Button>
              <Button
                isIconOnly
                isDisabled={edges.end}
                className="button-outline"
                aria-label="Следующие места"
                aria-controls="places-rail"
                onPress={() => move(1)}
              >
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
          <div
            id="places-rail"
            ref={rail}
            className="places-rail"
            role="group"
            aria-label="Остановки маршрута"
            tabIndex={0}
            data-lenis-prevent-horizontal
            onFocus={(event) => {
              const card = event.target.closest<HTMLElement>(".place");
              const list = event.currentTarget;
              if (!card) return;
              const bounds = list.getBoundingClientRect();
              const item = card.getBoundingClientRect();
              if (item.left < bounds.left - 1 || item.right > bounds.right + 1)
                list.scrollTo({ left: card.offsetLeft });
            }}
          >
            {places.map((place) => (
              <article
                id={"place-" + place.id}
                key={place.id}
                className="place"
                data-active={active === place.id}
              >
                <a
                  href="#map"
                  className="place-map-link"
                  aria-label={`Показать в маршруте: ${place.title}`}
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("tobolsk:point", { detail: place.id }),
                    )
                  }
                >
                  <PlaceEmblem id={place.id} />
                </a>
                <h3>{place.cardTitle ?? place.title}</h3>
                <p>{place.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
