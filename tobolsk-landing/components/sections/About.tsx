import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { aboutPhoto } from "@/content/photos";
export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <Reveal>
          <div className="about-layout">
            <div className="about-copy">
              <h2 id="about-title">Тобольск, в котором жил Ершов</h2>
              <p className="intro">
                Ершов написал «Конька-Горбунка» студентом в Петербурге. В
                Тобольске он вырос, а позже вернулся сюда работать. Начнём со
                знакомства с городом, который он знал.
              </p>
              <p>
                У каждого дня свой характер. В первый разглядываем город и
                дворцовые залы, во второй сами пробуем ремесло и слушаем редкие
                инструменты, а на третий сбавляем шаг у Иртыша.
              </p>
            </div>
            <figure className="about-photo">
              <div>
                <Image
                  src={aboutPhoto.src}
                  alt={aboutPhoto.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 960px) 95vw, (max-width: 1304px) 47vw, 640px"
                />
              </div>
              <figcaption>{aboutPhoto.caption}</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
