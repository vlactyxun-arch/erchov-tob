"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LeadLink } from "@/components/shared/LeadLink";
import { heroPhoto } from "@/content/photos";

export function Hero() {
  const scene = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start start", "end start"],
  });
  const frame = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["inset(5% 9% 5% 9% round 16px)", "inset(0% 0% 0% 0% round 16px)"],
  );
  const zoom = useTransform(scrollYProgress, [0, 0.45], [1, 1.12]);

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div ref={scene} className="hero-scene">
        <div className="hero-sticky">
          <div className="hero-stage">
            <m.figure className="hero-frame" style={{ clipPath: frame }}>
              <m.div className="hero-image" style={{ scale: zoom }}>
                <Image
                  src={heroPhoto.src}
                  alt={heroPhoto.alt}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                />
              </m.div>
            </m.figure>
            <div className="hero-copy">
              <h1 id="hero-title">Тобольск глазами Ершова</h1>
              <p className="hero-subtitle">Тобольск, который ты не видел</p>
              <p>
                Начнём с квеста в историческом отеле, заглянем в старую
                типографию и за кулисы театра. Если выберете три дня, съездим в
                Абалак.
              </p>
              <div className="actions">
                <LeadLink source="hero">
                  Заказать звонок <span aria-hidden="true">↗</span>
                </LeadLink>
                <a className="text-link" href="#program">
                  Смотреть программу ↓
                </a>
              </div>
            </div>
          </div>
          <div className="wrap hero-meta" id="anchors">
            <span>{heroPhoto.caption}</span>
            <span>Два или три дня · Группы от 8 человек</span>
            <a href="#gallery">Фото с маршрута ↓</a>
          </div>
        </div>
      </div>
    </section>
  );
}
