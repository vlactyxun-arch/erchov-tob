import { Section } from "@/components/shared/Section";
import { LeadLink } from "@/components/shared/LeadLink";
import tariffs from "@/content/tariffs.json";

const groupInclusions = [
  {
    title: "Встреча и проводы",
    detail: "Встречаем группу в начале поездки и провожаем после программы.",
  },
  {
    title: "Проживание",
    detail: "На выбор хостел, гостиница «Тобол» или «Сибирь».",
  },
  {
    title: "Транспорт",
    detail: "Переезды между остановками по программе.",
  },
  {
    title: "Экскурсии",
    detail: "В сопровождении аккредитованного экскурсовода.",
  },
  {
    title: "Билеты в музеи",
    detail: "Входные билеты на посещения по программе.",
  },
  {
    title: "Мастер-классы",
    detail: "Резьба по кости и печать открытки на старинном станке.",
  },
  {
    title: "Обеды",
    detail: "Три обеда по специальному меню в трёхдневной программе.",
  },
  {
    title: "Паспорт путешественника",
    detail: "Паспорт-блокнот и ручка на память о поездке.",
  },
];

export function Pricing() {
  return (
    <Section id="pricing" title="Сколько стоит поездка">
      <div className="price-grid">
        {tariffs.map((tariff, index) => (
          <article className="price" key={tariff.title}>
            <h3>{tariff.title}</h3>
            <p className="amount">
              от {tariff.price.toLocaleString("ru-RU")} ₽
            </p>
            <p>{tariff.unit}</p>
            <ul>
              {tariff.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <LeadLink
              source="pricing"
              className="button-outline"
              preset={{
                format: index === 2 ? "individual" : "group",
                people: index === 2 ? 1 : 8,
              }}
            >
              Уточнить стоимость
            </LeadLink>
          </article>
        ))}
      </div>
      <section
        className="price-inclusions"
        aria-labelledby="price-inclusions-title"
      >
        <h3 id="price-inclusions-title">Что входит в стоимость</h3>
        <ul>
          {groupInclusions.map(({ title, detail }) => (
            <li key={title}>
              <span className="price-inclusion-check" aria-hidden="true">
                ✓
              </span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="price-inclusions-note">
          Итоговая стоимость зависит от числа дней и размещения.
        </p>
      </section>
    </Section>
  );
}
