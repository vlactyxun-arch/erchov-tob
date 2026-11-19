"use client";

import Image from "next/image";
import { publicPath } from "@/lib/public-path";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LeadLink } from "@/components/shared/LeadLink";
import { heroPhoto } from "@/content/photos";

export function Hero() {
  const scene = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start start", "end start"],
  });
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.42, 0.1]);

  return (
    <section
      ref={scene}
      id="hero"
      className="hero"
      aria-labelledby="hero-title"
    >
      <m.div className="hero-image" style={{ scale: zoom, y: lift, opacity }}>
        <picture>
          <source
            media="(min-width: 1600px)"
            srcSet={publicPath(heroPhoto.wideSrc)}
          />
          <Image
            src={publicPath(heroPhoto.src)}
            alt={heroPhoto.alt}
            fill
            loading="eager"
            fetchPriority="high"
            unoptimized
            sizes="100vw"
          />
        </picture>
      </m.div>
      <div className="wrap hero-copy">
        <h1 id="hero-title">
          Тобольск <em>глазами Ершова</em>
        </h1>
        <div className="hero-details">
          <p className="hero-subtitle">
            Древний сибирский город, который ты не видел
          </p>
          <p>авторский маршрут на 2 или 3 дня</p>
          <div className="actions">
            <a className="text-link" href="#about" data-story-scroll>
              Начать историю
            </a>
            <LeadLink source="hero">Обсудить поездку</LeadLink>
          </div>
        </div>
      </div>
    </section>
  );
}
