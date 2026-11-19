"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { HorseMark } from "./HorseMark";
import { LeadLink } from "./LeadLink";

export function Header() {
  const run = useRef<Animation | null>(null);

  useEffect(() => () => run.current?.cancel(), []);

  function runHorse(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const logo = event.currentTarget;
    const drawing = logo.querySelector(".horse-travel");
    if (!drawing) return;

    run.current?.cancel();
    const bounds = logo.getBoundingClientRect();
    const left = -bounds.right - 24;
    const right = document.documentElement.clientWidth - bounds.left + 24;
    logo.classList.add("horse-running");
    const animation = drawing.animate(
      [
        { transform: "translateX(0) scaleX(-1)", offset: 0, easing: "ease-in" },
        {
          transform: `translateX(${left}px) scaleX(-1)`,
          opacity: 1,
          offset: 0.47,
        },
        {
          transform: `translateX(${left}px) scaleX(-1)`,
          opacity: 0,
          offset: 0.48,
        },
        {
          transform: `translateX(${right}px) scaleX(-1)`,
          opacity: 0,
          offset: 0.51,
        },
        {
          transform: `translateX(${right}px) scaleX(-1)`,
          opacity: 1,
          offset: 0.52,
          easing: "ease-out",
        },
        { transform: "translateX(0) scaleX(-1)", opacity: 1, offset: 0.96 },
        { transform: "translateX(0) scaleX(1)", opacity: 1, offset: 1 },
      ],
      { duration: 3600 },
    );
    run.current = animation;
    animation.onfinish = () => {
      logo.classList.remove("horse-running");
      run.current = null;
    };
  }

  return (
    <header className="header">
      <div className="wrap header-inner">
        <a
          href="#hero"
          className="horse-logo"
          aria-label="Тобольск глазами Ершова. К началу страницы"
          onClick={runHorse}
        >
          <HorseMark />
        </a>
        <nav className="header-nav header-nav-start" aria-label="Маршрут">
          <a href="#gallery">Галерея</a>
          <a href="#program">Программа</a>
          <a href="#locations">Места</a>
        </nav>
        <div className="header-end">
          <nav
            className="header-nav header-nav-end"
            aria-label="Планирование поездки"
          >
            <a href="#schedule">Даты</a>
            <a href="#pricing">Стоимость</a>
          </nav>
          <LeadLink source="header" className="header-booking">
            Записаться
          </LeadLink>
        </div>
      </div>
    </header>
  );
}
