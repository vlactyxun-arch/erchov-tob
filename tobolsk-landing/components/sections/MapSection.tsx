"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/shared/Section";
import { track } from "@/lib/analytics";
import places from "@/content/locations.json";
const mappedPlaces = places.filter((place) => place.coords);
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
      track("map_point_click", { id });
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
  return (
    <Section id="map" title="Тобольск и Абалак на карте">
      <p>
        Карта открывается на Тобольске. Выберите монастырь или туркомплекс в
        списке, чтобы увидеть Абалак.
      </p>
      <div className="map-layout">
        <div ref={frame} data-lenis-prevent>
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
          <div aria-label="Точки маршрута">
            {mappedPlaces.map((place, index) => (
              <button
                type="button"
                key={place.id}
                aria-pressed={place.id === point}
                onClick={() => select(place.id)}
              >
                <span className="map-list-number" aria-hidden="true">
                  {index + 1}
                </span>
                {place.title}
              </button>
            ))}
          </div>
          {active && <a href={"#place-" + active.id}>Подробнее о месте ↗</a>}
        </div>
      </div>
    </Section>
  );
}
