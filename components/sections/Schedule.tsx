import { Section } from "@/components/shared/Section";
import { LeadLink } from "@/components/shared/LeadLink";
import { Badge } from "@/components/ui/badge";
import schedule from "@/content/schedule.json";

export function Schedule() {
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Yekaterinburg",
  }).format(new Date());
  const upcoming = schedule
    .filter((slot) => slot.starts >= today && slot.seatsLeft >= 8)
    .sort((a, b) => a.starts.localeCompare(b.starts));
  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <Section id="schedule" title="Ближайшие даты">
      <div className="section-bar">
        <p>
          {upcoming.some((slot) => slot.demo)
            ? "Пока здесь пример расписания. Оставьте заявку, и мы подскажем, на какие даты есть места."
            : "Оставьте заявку, чтобы уточнить, есть ли места на нужную дату."}
        </p>
        <Badge>от 8 человек</Badge>
      </div>
      <ul className="date-list">
        {upcoming.map((slot) => (
          <li key={slot.starts}>
            <div>
              <time dateTime={slot.starts}>
                {date.format(new Date(slot.starts))}
              </time>
              {slot.demo && <small>Пример даты</small>}
            </div>
            <span>
              {slot.days} дня · {slot.seatsLeft} мест
              {slot.demo ? " (пример)" : ""}
            </span>
            <LeadLink
              source="schedule"
              className="button-outline"
              preset={{
                format: "group",
                people: 8,
                days: slot.days === 3 ? "3" : "2",
                date: slot.demo ? "" : slot.starts,
                intent: "program",
              }}
            >
              {slot.demo ? "Уточнить даты" : "Запросить программу"}
            </LeadLink>
          </li>
        ))}
      </ul>
      {!upcoming.length && (
        <p>
          Даты для групп пока уточняем. Оставьте заявку, если хотите обсудить
          удобные дни.
        </p>
      )}
      <LeadLink
        source="schedule-individual"
        className="text-link"
        preset={{ format: "individual", people: 1 }}
      >
        Подобрать индивидуальные даты
      </LeadLink>
    </Section>
  );
}
