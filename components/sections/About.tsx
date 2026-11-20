import { HorseAppears } from "@/components/shared/HorseMark";
import { StoryText } from "@/components/shared/StoryText";

const paragraphs = [
  "Мы создали маршрут, который не просто рассказывает о Ершове, он позволяет прожить его эпоху.",
  "Три дня погружения в атмосферу XIX века: от парадных залов Дворца Наместника до закулисья театра, от старинной типографии до шёпота страниц редчайших книг из частной коллекции.",
];

export function About() {
  return (
    <section id="about" className="section story" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title" className="sr-only">
          О маршруте
        </h2>
        <StoryText paragraphs={paragraphs} />
        <HorseAppears className="story-horse" />
      </div>
    </section>
  );
}
