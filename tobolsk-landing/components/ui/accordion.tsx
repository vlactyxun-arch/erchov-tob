"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useReducedMotion } from "framer-motion";
import type { FAQItem } from "@/lib/types";

const topicIcons = [
  "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5 8H4v-2a5 5 0 0 1 10 0v2Zm1-13a3 3 0 0 1 0 6m5 7v-2a5 5 0 0 0-3-4",
  "M5 7h14v13H5zM5 11h14M8 4v4m8-4v4m-7 7h2m3 0h2",
  "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8a6 6 0 0 1 12 0M5 12l-2 2m16-2 2 2",
  "M5 7h12m-3-3 3 3-3 3m5 7H7m3-3-3 3 3 3",
  "M6 4h8l4 4v12H6zM14 4v5h4M9 13h6m-6 3h6",
  "M4 7h16v12H4zM4 10l13-6 2 3m-2 7h3",
  "M4 19h5v-5h5V9h6M4 19v2m4-2 11-15",
];
export function AccordionList({ items }: { items: FAQItem[] }) {
  const reduced = useReducedMotion();
  return (
    <Accordion
      selectionMode="single"
      disableAnimation={Boolean(reduced)}
      className="faq-list"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          title={
            <span className="faq-label">
              <svg className="faq-topic" viewBox="0 0 24 24" aria-hidden="true">
                <path d={topicIcons[index] ?? topicIcons[4]} />
              </svg>
              <span>{item.question}</span>
            </span>
          }
          indicator={({ isOpen }) => (
            <svg
              className="faq-chevron"
              data-expanded={Boolean(isOpen)}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
          classNames={{
            base: "faq-item",
            heading: "faq-heading",
            trigger: "faq-trigger",
            title: "faq-question",
            indicator: "faq-indicator",
            content: "faq-answer",
          }}
        >
          <p>{item.answer}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
