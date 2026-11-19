"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";

const examples = [
  {
    trip: "Семейная поездка",
    text: "После встречи с Ершовым ребёнок весь день спрашивал, где жили герои сказки. Вечером сами открыли «Конька-Горбунка» и перечитали начало.",
  },
  {
    trip: "Поездка с друзьями",
    text: "В Музее печати мы сначала рассматривали старые газеты, а потом сами поработали за станком. Свой оттиск увезли домой.",
  },
  {
    trip: "Поездка на три дня",
    text: "Третий день в Абалаке запомнился тишиной и видом на Иртыш. Хорошо, что оставили время спокойно погулять перед дорогой домой.",
  },
  {
    trip: "Поездка с классом",
    text: "В косторезной мастерской ребята долго выбирали, какой узор сделать. В автобусе сравнивали работы и объясняли друг другу, как у кого получилось.",
  },
];

function move(rail: HTMLDivElement, step: -1 | 1) {
  const first = rail.firstElementChild;
  const second = first?.nextElementSibling;
  if (!(first instanceof HTMLElement) || !(second instanceof HTMLElement))
    return;

  const end = rail.scrollWidth - rail.clientWidth;
  const offset = second.offsetLeft - first.offsetLeft;
  const from = rail.scrollLeft;
  const left =
    step === 1 && from >= end - 2
      ? 0
      : step === -1 && from <= 2
        ? end
        : from + step * offset;

  rail.scrollTo({
    left,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

export function Reviews() {
  const rail = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const list = rail.current;
    if (!list) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!motion.matches);
    const stopForReducedMotion = () => {
      if (motion.matches) setPlaying(false);
    };
    motion.addEventListener("change", stopForReducedMotion);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.6),
      { threshold: 0.6 },
    );
    observer.observe(list);
    return () => {
      motion.removeEventListener("change", stopForReducedMotion);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(() => {
      if (
        !document.hidden &&
        rail.current &&
        !slider.current?.matches(":hover, :focus-within")
      )
        move(rail.current, 1);
    }, 16000);
    return () => window.clearInterval(timer);
  }, [playing, visible]);

  function navigate(step: -1 | 1) {
    setPlaying(false);
    if (rail.current) move(rail.current, step);
  }

  return (
    <Section id="reviews" title="Отзывы посетителей">
      <div ref={slider}>
        <div className="reviews-toolbar">
          <p>Примеры отзывов. Тексты вымышлены.</p>
          <div className="reviews-controls">
            <Button
              className="button-outline"
              onPress={() => setPlaying(!playing)}
            >
              {playing ? "Пауза" : "Автопрокрутка"}
            </Button>
            <Button
              isIconOnly
              className="button-outline"
              aria-controls="reviews-rail"
              aria-label="Предыдущий отзыв"
              onPress={() => navigate(-1)}
            >
              ←
            </Button>
            <Button
              isIconOnly
              className="button-outline"
              aria-controls="reviews-rail"
              aria-label="Следующий отзыв"
              onPress={() => navigate(1)}
            >
              →
            </Button>
          </div>
        </div>
        <div
          ref={rail}
          id="reviews-rail"
          className="reviews-rail"
          tabIndex={0}
          role="group"
          aria-label="Примеры отзывов о маршруте"
          data-lenis-prevent-horizontal
          onPointerDown={() => setPlaying(false)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            navigate(event.key === "ArrowLeft" ? -1 : 1);
          }}
        >
          {examples.map((review) => (
            <figure key={review.trip} className="review">
              <blockquote>«{review.text}»</blockquote>
              <figcaption>{review.trip}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
