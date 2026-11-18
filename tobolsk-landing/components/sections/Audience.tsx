"use client";

import { useState } from "react";
import { Section } from "@/components/shared/Section";
import { LeadLink } from "@/components/shared/LeadLink";
import type { TripPurpose } from "@/lib/lead";

const purposes = [
  { value: "self", label: "Для себя" },
  { value: "gift", label: "В подарок" },
] as const;

const sizes = [
  { min: 1, max: 1, label: "1 человек" },
  { min: 2, max: 2, label: "2 человека" },
  { min: 3, max: 7, label: "От 3 до 7 человек" },
  { min: 8, max: 100, label: "8 и больше" },
];

export function Audience() {
  const [purpose, setPurpose] = useState<TripPurpose>("self");
  const [guestCount, setGuestCount] = useState("1");
  const people = Math.min(
    100,
    Math.max(1, Math.trunc(Number(guestCount)) || 1),
  );
  const isGroup = people >= 8;

  return (
    <Section id="audience" title="Подберите поездку">
      <div className="panel audience-panel">
        <fieldset>
          <legend>Для кого поездка?</legend>
          <div className="audience-options">
            {purposes.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="audience-purpose"
                  checked={purpose === option.value}
                  onChange={() => setPurpose(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Сколько человек поедет?</legend>
          <div className="audience-options">
            {sizes.map((size) => (
              <label key={size.min}>
                <input
                  type="radio"
                  name="audience-size"
                  checked={people >= size.min && people <= size.max}
                  onChange={() => setGuestCount(String(size.min))}
                />
                {size.label}
              </label>
            ))}
          </div>
          <label className="audience-exact">
            Точное количество
            <input
              type="number"
              min={1}
              max={100}
              step={1}
              value={guestCount}
              onChange={(event) => setGuestCount(event.target.value)}
              onBlur={() => setGuestCount(String(people))}
            />
          </label>
        </fieldset>
        <div className="audience-result">
          <div aria-live="polite">
            <strong>
              {isGroup ? "Групповая поездка" : "Индивидуальная поездка"}
            </strong>
            <p>
              {isGroup
                ? "Готовая программа на 2 или 3 дня для компании от 8 человек."
                : "Выберите места, которые хотите увидеть. Вместе подберём даты и составим маршрут."}
            </p>
          </div>
          <LeadLink
            source="audience"
            preset={{
              purpose,
              people,
              format: isGroup ? "group" : "individual",
              intent: isGroup && purpose === "self" ? "program" : "callback",
            }}
          >
            {purpose === "gift"
              ? "Обсудить подарок"
              : isGroup
                ? "Запросить программу"
                : "Обсудить поездку"}
          </LeadLink>
        </div>
      </div>
    </Section>
  );
}
