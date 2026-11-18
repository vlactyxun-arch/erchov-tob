import { Section } from "@/components/shared/Section";
import { AccordionList } from "@/components/ui/accordion";
import questions from "@/content/faq.json";
export function FAQ() {
  return (
    <Section id="faq" title="Частые вопросы">
      <AccordionList items={questions} />
    </Section>
  );
}
