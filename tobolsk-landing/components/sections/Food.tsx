import { Section } from "@/components/shared/Section";
export function Food() {
  return (
    <Section id="food" title="Сибирский ужин">
      <div className="split">
        <p className="intro">
          В первый вечер соберёмся на ужин с сибирскими блюдами. После квеста,
          прогулки и дворца будет время спокойно поесть и поговорить.
        </p>
        <div className="note">
          <h3>Если есть пожелания</h3>
          <p>
            Ресторан и меню уточним перед поездкой. Если у вас аллергия или вы
            чего-то не едите, напишите об этом в заявке.
          </p>
        </div>
      </div>
    </Section>
  );
}
