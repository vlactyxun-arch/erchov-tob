"use client";

import { useRef, type MouseEvent } from "react";
import { LeadLink } from "./LeadLink";
export function Header() {
  const run = useRef<Animation | null>(null);

  const runHorse = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const logo = event.currentTarget;
    const drawing = logo.querySelector("svg");
    if (!drawing) return;

    run.current?.cancel();
    const bounds = logo.getBoundingClientRect();
    const left = -bounds.right - 8;
    const right = document.documentElement.clientWidth - bounds.left + 8;
    logo.classList.add("horse-running");
    run.current = drawing.animate(
      [
        { transform: "translateX(0)", offset: 0, easing: "ease-in-out" },
        { transform: `translateX(${left}px)`, opacity: 1, offset: 0.28 },
        { transform: `translateX(${left}px)`, opacity: 0, offset: 0.29 },
        { transform: `translateX(${right}px)`, opacity: 0, offset: 0.3 },
        {
          transform: `translateX(${right}px)`,
          opacity: 1,
          offset: 0.31,
          easing: "cubic-bezier(.35,.25,.4,1)",
        },
        { transform: "translateX(0)", opacity: 1, offset: 1 },
      ],
      { duration: 2300 },
    );
    run.current.onfinish = () => {
      logo.classList.remove("horse-running");
      run.current = null;
    };
  };

  return (
    <header className="header">
      <div className="wrap header-inner">
        <a
          href="#hero"
          className="horse-logo"
          aria-label="Конёк-Горбунок. К началу страницы"
          onClick={runHorse}
        >
          <svg viewBox="0 0 112 146" aria-hidden="true" focusable="false">
            <g className="horse-trot">
              <path
                className="horse-tail"
                d="M72 80c17 1 31 8 33 22 4 19-10 28-8 41-7-1-10-6-9-12-5 8-9 12-17 13 10-10 12-22 13-32 1-11-3-21-12-27Z"
                fill="#f2eee4"
                stroke="#645d56"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <g
                className="horse-leg horse-leg-back"
                style={{ transformOrigin: "27px 96px" }}
              >
                <path d="m27 96-16 14 12 24" />
                <path d="m21 132 5 1 1 5-7-2Z" fill="#39342e" stroke="none" />
              </g>
              <g
                className="horse-leg horse-leg-back horse-leg-opposite"
                style={{ transformOrigin: "70px 96px" }}
              >
                <path d="m70 96 12 14-2 27" />
                <path d="m78 135 5-1-1 8-7 1Z" fill="#39342e" stroke="none" />
              </g>
              <g
                className="horse-leg horse-leg-opposite"
                style={{ transformOrigin: "27px 100px" }}
              >
                <path d="M27 100c1 12-2 24-11 39" />
                <path d="m13 138 6-2-2 6-8 1Z" fill="#39342e" stroke="none" />
              </g>
              <g
                className="horse-leg"
                style={{ transformOrigin: "64px 100px" }}
              >
                <path d="m64 100 7 12-9 15-9 12" />
                <path d="m50 138 7-2-3 6-8 1Z" fill="#39342e" stroke="none" />
              </g>
              <path
                d="M47 36c6-11 11-23 20-32-1 13-7 25-17 34Zm2 4c16 0 30-7 38-16-4 15-18 24-39 22Z"
                fill="#7d7970"
                stroke="#4e473f"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M43 36c7 2 9 10 6 16-4 8-9 15-10 26 9-4 21-6 30-2 11 5 14 15 9 23-4 7-13 9-22 7l-27-3c-11-1-16-8-14-18 2-14 10-24 17-34l-7 3-8-1-3-6 5-6 9-2c5-6 10-7 15-3Z"
                fill="#969187"
                stroke="#514a42"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d="M45 32c-7-6-16-3-22 1l-8 3 10 1-8 5c11 0 17-4 23-4 5 1 8 3 7 8-1 9-10 16-14 22l6-4c-5 9-11 17-12 28-3-8-1-17 2-23l-6 4c4-9 12-17 16-26 3-6 4-11 6-15Z"
                fill="#f2eee4"
                stroke="#645d56"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M34 92c5-7 8-14 11-23 2-6 6-7 9-4 2 2 1 6 0 10 5-4 7-13 12-12 6 1 4 9 1 16-3 7-5 13-6 19-11 2-20 0-27-6Z"
                fill="#a52f27"
                stroke="#6d2520"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M35 92c8 3 17 4 27 2"
                fill="none"
                stroke="#edba58"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M31 44c2-2 4-2 6 0"
                fill="none"
                stroke="#39342e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="19" cy="47" r="1.5" fill="#39342e" />
            </g>
          </svg>
        </a>
        <nav aria-label="Разделы маршрута">
          <a href="#program">Программа</a>
          <a href="#locations">Места</a>
          <a href="#gallery">Фото</a>
          <a href="#schedule">Даты</a>
          <a href="#pricing">Стоимость</a>
        </nav>
        <LeadLink source="header" className="button-outline">
          Заказать звонок
        </LeadLink>
      </div>
    </header>
  );
}
