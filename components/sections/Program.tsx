"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { LeadLink } from "@/components/shared/LeadLink";
import days from "@/content/days.json";
import places from "@/content/locations.json";
import { publicPath } from "@/lib/public-path";
import type { Day } from "@/lib/types";

const itinerary = days.map((day: Day) => ({
  ...day,
  cover: places.find((place) => place.id === day.coverLocationId),
}));
export function Program() {
  const [duration, setDuration] = useState<"2" | "3">("3");
  const reduced = useReducedMotion();
  return (
    <Section id="program" title="Программа по дням">
      <div className="section-bar">
        <p>
          На два дня остаёмся в Тобольске. Если есть третий день, едем в Абалак.
          Время встреч уточним перед поездкой.
        </p>
        <div className="segments" aria-label="Продолжительность">
          {(["2", "3"] as const).map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={duration === value}
              onClick={() => setDuration(value)}
            >
              {value} дня
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        <m.div
          className="day-grid"
          key={duration}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.14 } }}
          transition={{
            duration: reduced ? 0 : 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {itinerary.slice(0, Number(duration)).map((day, index) => (
            <article className="day" key={day.title}>
              <h3 className="day-heading">
                <span>День {index + 1}</span>
                {day.title}
              </h3>
              {day.cover?.image && (
                <div className="day-photo">
                  <Image
                    src={publicPath(day.cover.image)}
                    alt={day.cover.imageAlt ?? ""}
                    fill
                    unoptimized
                    sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 32vw"
                  />
                </div>
              )}
              <ol className="timeline">
                {day.stops.map((stop) => (
                  <li key={stop.title}>
                    <div>
                      <strong>
                        {stop.locationId ? (
                          <a href={"#place-" + stop.locationId}>{stop.title}</a>
                        ) : (
                          stop.title
                        )}
                      </strong>
                      {stop.optional && (
                        <small className="stop-optional">По желанию</small>
                      )}
                      <p>{stop.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </m.div>
      </AnimatePresence>
      <LeadLink
        source="program"
        className="button-outline"
        preset={{ intent: "program", format: "group", days: duration }}
      >
        Запросить программу для группы
      </LeadLink>
    </Section>
  );
}
