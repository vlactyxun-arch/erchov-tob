"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { publicPath } from "@/lib/public-path";

const examples = [
  {
    trip: "Семейная поездка",
    portrait: 2,
    text: "После встречи с Ершовым ребёнок весь день спрашивал, где жили герои сказки. Вечером сами открыли «Конька-Горбунка» и перечитали начало.",
  },
  {
    trip: "Поездка с друзьями",
    portrait: 13,
    text: "В Музее печати мы сначала рассматривали старые газеты, а потом сами поработали за станком. Свой оттиск увезли домой.",
  },
  {
    trip: "Поездка на три дня",
    portrait: 10,
    text: "На третий день пошли пешком к старой сосне. После двух дней в городе было здорово сменить обстановку и спокойно пройтись по лесу.",
  },
  {
    trip: "Поездка с классом",
    portrait: 4,
    text: "В косторезной мастерской ребята долго выбирали, какой узор сделать. В автобусе сравнивали работы и объясняли друг другу, как у кого получилось.",
  },
];

const portraitSheet = publicPath("/images/review-portraits.jpg");
const sheetColumns = 4;

function portraitStyle(portrait: number) {
  const step = 100 / (sheetColumns - 1);
  const column = portrait % sheetColumns;
  const row = Math.floor(portrait / sheetColumns);
  return {
    backgroundImage: `url("${portraitSheet}")`,
    backgroundPosition: `${column * step}% ${row * step}%`,
    backgroundSize: `${sheetColumns * 100}%`,
  };
}

export function Reviews() {
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogTitle = useRef<HTMLHeadingElement>(null);
  const [selection, setSelection] = useState<number | null>(null);
  const review = selection === null ? null : examples[selection];

  useEffect(() => {
    const panel = dialog.current;
    if (selection !== null && panel && !panel.open) {
      panel.showModal();
      dialogTitle.current?.focus({ preventScroll: true });
      panel.scrollTop = 0;
    }
  }, [selection]);

  return (
    <Section id="reviews" title="Отзывы посетителей">
      <div className="review-cards">
        {examples.map(({ trip, portrait }, index) => (
          <Button
            key={trip}
            className="review-card"
            aria-label={`Прочитать отзыв. ${trip}`}
            aria-haspopup="dialog"
            aria-controls="review-dialog"
            onPress={() => setSelection(index)}
          >
            <span
              className="review-card-portrait"
              style={portraitStyle(portrait)}
              aria-hidden="true"
            />
            <span className="review-card-label">{trip}</span>
          </Button>
        ))}
      </div>
      <p className="review-note">Отзывы вымышлены. Портреты иллюстративные.</p>
      <dialog
        id="review-dialog"
        ref={dialog}
        className="review-dialog"
        data-lenis-prevent
        aria-labelledby="review-dialog-title"
        aria-describedby="review-dialog-note"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onClose={() => setSelection(null)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const step = event.key === "ArrowLeft" ? -1 : 1;
          setSelection((current) =>
            current === null
              ? null
              : (current + step + examples.length) % examples.length,
          );
        }}
      >
        {review && (
          <div className="review-dialog-content">
            <div
              className="review-dialog-portrait"
              aria-hidden="true"
              style={portraitStyle(review.portrait)}
            />
            <div className="review-dialog-body">
              <div className="review-dialog-copy" aria-live="polite">
                <h3 id="review-dialog-title" ref={dialogTitle} tabIndex={-1}>
                  {review.trip}
                </h3>
                <blockquote>«{review.text}»</blockquote>
              </div>
              <p id="review-dialog-note" className="review-note">
                Вымышленный отзыв
              </p>
              <Button
                className="button-outline"
                onPress={() => dialog.current?.close()}
              >
                Закрыть
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </Section>
  );
}
