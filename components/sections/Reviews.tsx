"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { publicPath } from "@/lib/public-path";

const reviews = [
  {
    label: "Евгения Р. · Ижевск",
    portrait: "/images/review-evgeniya-rudina.jpg",
    example: false,
    text: "Программа насыщенная, раскрывает жизнь и путь самого Ершова с разных сторон, погружает в его творчество. После каждой локации остается небольшой сувенир или какое-то памятное ощущение. Очень крутая идея с паспортом туриста! Путешествовали вчетвером: я и трое детей. Нам очень понравилось!",
  },
  {
    label: "Поездка с детьми",
    portrait: 12,
    example: true,
    text: "Думала, что дети устанут уже в первом музее. А в сквере Ершова они так увлеклись поиском героев сказки, что потом ещё за обедом обсуждали Рыбу-Кита. Мне больше всего запомнился Дворец наместника. После прогулки с гидом гораздо легче было представить, каким Ершов видел Тобольск.",
  },
  {
    label: "Поездка с друзьями",
    portrait: 1,
    example: true,
    text: "Поехали с друзьями на два дня. В Музее печати разглядывали наборные литеры и пытались представить, сколько времени уходило на одну страницу. А на занятии по резьбе сами попробовали вывести узор. После этого я совсем по-другому смотрел на работы мастеров.",
  },
  {
    label: "Поездка на три дня",
    portrait: 8,
    example: true,
    text: "После двух дней в городе было здорово пройтись по лесу в парке «Алемасова». Дошли до реликтовой сосны, а по возвращении в Тобольск побывали у могилы Ершова. По дороге вспоминали, что рассказывали о нём в первый день. Получилось очень тихое и тёплое завершение поездки.",
  },
];

const portraitSheet = publicPath("/images/review-portraits.jpg");
const sheetColumns = 4;

function portraitStyle(portrait: number | string) {
  if (typeof portrait === "string") {
    return {
      backgroundImage: `url("${publicPath(portrait)}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
  }

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
  const review = selection === null ? null : reviews[selection];

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
        {reviews.map(({ label, portrait, example }, index) => (
          <Button
            key={label}
            className="review-card"
            aria-label={`${example ? "Пример отзыва" : "Прочитать отзыв"}. ${label}`}
            aria-haspopup="dialog"
            aria-controls="review-dialog"
            onPress={() => setSelection(index)}
          >
            <span
              className="review-card-portrait"
              style={portraitStyle(portrait)}
              aria-hidden="true"
            />
            <span className="review-card-label">
              {example && (
                <span className="review-card-example">Пример отзыва</span>
              )}
              {label}
            </span>
          </Button>
        ))}
      </div>
      <dialog
        id="review-dialog"
        ref={dialog}
        className="review-dialog"
        data-lenis-prevent
        aria-labelledby="review-dialog-title"
        aria-describedby="review-dialog-quote"
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
              : (current + step + reviews.length) % reviews.length,
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
                  {review.label}
                </h3>
                <blockquote id="review-dialog-quote">«{review.text}»</blockquote>
              </div>
              {review.example && (
                <p className="review-note">
                  Вымышленный отзыв. Иллюстративный портрет.
                </p>
              )}
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
