"use client";
import { m, useReducedMotion } from "framer-motion";
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={false}
      whileInView={reduced ? undefined : { y: [8, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
