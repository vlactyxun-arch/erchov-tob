"use client";

import Image from "next/image";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { publicPath } from "@/lib/public-path";

const views = [
  {
    src: "/images/story/ershov-welcome.jpg",
    alt: "Актёр в образе Ершова стоит у открытой двери гимназии",
    caption: "Ершов встречает гостей",
    place: "Тобольская гимназия",
    position: "24% 48%",
  },
  {
    src: "/images/story/portrait-room.jpg",
    alt: "Экскурсовод показывает гостям портреты",
    caption: "Истории за портретами",
    place: "Тобольск",
    position: "50% 46%",
  },
  {
    src: "/images/story/press-workshop.jpg",
    alt: "Участница поездки работает за деревянным печатным станком",
    caption: "За печатным станком",
    place: "Музей печати",
    position: "74% 53%",
  },
  {
    src: "/images/story/open-book.jpg",
    alt: "Руки перелистывают книгу с цветными иллюстрациями",
    caption: "Иллюстрированное издание",
    place: "Редкие книги",
    position: "62% 63%",
  },
];
const fades = [
  [1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1],
];

function RouteView({
  view,
  index,
  progress,
}: {
  view: (typeof views)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 1],
    fades[index],
  );
  const scale = useTransform(progress, [0, 1], [1, 1.07]);

  return (
    <m.figure className="route-view" style={{ opacity }}>
      <m.div className="route-view-image" style={{ scale }}>
        <Image
          src={publicPath(view.src)}
          alt={view.alt}
          fill
          unoptimized
          sizes="100vw"
          style={{ objectPosition: view.position }}
        />
      </m.div>
      <figcaption className="gallery-tile-caption">
        <span>{view.place}</span>
        <strong>{view.caption}</strong>
      </figcaption>
    </m.figure>
  );
}

export function RouteFeature() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={section}
      id="route-feature"
      className="route-feature"
      aria-label="Фотоглава о маршруте"
    >
      <div className="route-feature-sticky">
        <div className="route-feature-views">
          {views.map((view, index) => (
            <RouteView
              key={view.src}
              view={view}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
