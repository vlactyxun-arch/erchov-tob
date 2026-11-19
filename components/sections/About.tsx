"use client";

import { m, useScroll, useSpring, type MotionStyle } from "framer-motion";
import { Fragment, useRef, type CSSProperties } from "react";
import { HorseAppears } from "@/components/shared/HorseMark";

const paragraphs = [
  "Мы создали маршрут, который не просто рассказывает о Ершове, он позволяет прожить его эпоху.",
  "Три дня погружения в атмосферу XIX века: от парадных залов Дворца Наместника до закулисья театра, от старинной типографии до шёпота страниц редчайших книг из частной коллекции.",
];
const length = paragraphs.join("").replaceAll(" ", "").length;

export function About() {
  const copy = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: copy,
    offset: ["start 0.92", "end 0.48"],
  });
  const ink = useSpring(scrollYProgress, { stiffness: 180, damping: 32 });
  let character = 0;

  return (
    <section id="about" className="section story" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title" className="sr-only">
          О маршруте
        </h2>
        <m.div
          ref={copy}
          className="story-text"
          style={{ "--story-ink": ink } as MotionStyle}
        >
          {paragraphs.map((paragraph, column) => {
            const words = paragraph.split(" ");
            return (
              <p
                key={paragraph}
                className={column === 0 ? "story-lead" : "story-detail"}
              >
                <span className="sr-only">{paragraph}</span>
                <span aria-hidden="true">
                  {words.map((word, index) => (
                    <Fragment key={index}>
                      <span className="story-word">
                        {Array.from(word).map((letter, letterIndex) => (
                          <span
                            key={letterIndex}
                            className="story-letter"
                            style={
                              {
                                "--letter-at": (0.94 * character++) / length,
                              } as CSSProperties
                            }
                          >
                            {letter}
                          </span>
                        ))}
                      </span>
                      {index < words.length - 1 && " "}
                    </Fragment>
                  ))}
                </span>
              </p>
            );
          })}
        </m.div>
        <HorseAppears className="story-horse" />
      </div>
    </section>
  );
}
