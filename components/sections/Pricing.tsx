import { Section } from "@/components/shared/Section";
import { LeadLink } from "@/components/shared/LeadLink";
import tariffs from "@/content/tariffs.json";
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
      <div className="note">
        <h3>Что входит в стоимость</h3>
        <p>
          Цена зависит от числа дней и размещения. При записи уточним, какие
          экскурсии, билеты, мастер-классы, переезды и приёмы пищи входят в вашу
          программу. Спектакль и другие остановки по желанию обсудим отдельно.
        </p>
      </div>
    </Section>
  );
}
