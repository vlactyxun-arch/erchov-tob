"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/shared/Section";
import { track } from "@/lib/analytics";
import places from "@/content/locations.json";
const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <p className="map-frame map-placeholder">Загружается карта…</p>
  ),
});

export function MapSection() {
  const [point, setPoint] = useState("");
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const select = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      setPoint(id);
      if (id) track("map_point_click", { id });
    };
    window.addEventListener("tobolsk:point", select);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" },
    );
    if (frame.current) observer.observe(frame.current);
    return () => {
      observer.disconnect();
      window.removeEventListener("tobolsk:point", select);
    };
  }, []);
  const active = places.find((place) => place.id === point);
  const select = (id: string) =>
    window.dispatchEvent(new CustomEvent("tobolsk:point", { detail: id }));
  function selectFromList(id: string) {
    select(id);
    const map = frame.current;
    if (!map) return;
    const { top, bottom } = map.getBoundingClientRect();
    const offset = parseFloat(getComputedStyle(map).scrollMarginTop) || 0;
    if (top < offset - 2 || bottom > window.innerHeight) {
      map.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  }
  return (
    <Section id="map" title="Весь маршрут на карте">
      <div className="map-layout">
        <div ref={frame} className="map-sticky">
          {loaded ? (
            <RouteMap activeId={point} onSelect={select} />
          ) : (
            <button
              className="map-frame map-placeholder"
              onClick={() => setLoaded(true)}
            >
              Загрузить карту
            </button>
          )}
        </div>
        <div className="map-list">
          <ol className="map-stops" aria-label="Точки маршрута">
            {places.map((place, index) => (
              <li key={place.id}>
                <button
                  type="button"
                  aria-pressed={place.id === point}
                  onClick={() => selectFromList(place.id)}
                >
                  <span className="map-list-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  {place.title}
                </button>
              </li>
            ))}
          </ol>
          {active && (
            <>
              {active.mapNote && !active.coords && (
                <p role="status">{active.mapNote}</p>
              )}
              <div className="map-actions">
                <button type="button" onClick={() => select("")}>
                  Показать весь маршрут
                </button>
                <a href={"#place-" + active.id}>Подробнее о месте</a>
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
