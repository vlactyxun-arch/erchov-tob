"use client";

import { m, useScroll, useSpring, type MotionStyle } from "framer-motion";
import { Fragment, useRef, type CSSProperties } from "react";

export function StoryText({
  paragraphs,
  revealEnd = "end 0.24",
}: {
  paragraphs: readonly string[];
  revealEnd?: `end ${number}`;
}) {
  const length = paragraphs.join("").replaceAll(" ", "").length;
  const copy = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: copy,
    offset: ["start 0.92", revealEnd],
  });
  const ink = useSpring(scrollYProgress, { stiffness: 180, damping: 32 });
  let character = 0;

  return (
    <m.div
      ref={copy}
      className="story-text"
      style={{ "--story-ink": ink } as MotionStyle}
    >
      {paragraphs.map((paragraph) => {
        const words = paragraph.split(" ");
        return (
          <p key={paragraph}>
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
  );
}
