import { leadSchema } from "@/lib/lead";
import locations from "@/content/locations.json";

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 12000)
    return Response.json({ error: "Заявка слишком длинная." }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json(
      { error: "Проверьте данные заявки." },
      { status: 400 },
    );
  }
  const parsed = leadSchema.safeParse(body);
  if (
    !parsed.success ||
    parsed.data.locationIds.some(
      (id) => !locations.some((point) => point.id === id),
    )
  ) {
    return Response.json(
      { error: "Проверьте данные заявки." },
      { status: 400 },
    );
  }

  const {
    TELEGRAM_BOT_TOKEN: token,
    TELEGRAM_CHAT_ID: chatId,
    LEAD_DEMO,
  } = process.env;
  if (LEAD_DEMO === "true") return Response.json({ demo: true });
  if (!token || !chatId) {
    return Response.json(
      { error: "Приём заявок пока не подключён." },
      { status: 503 },
    );
  }
  const lead = parsed.data;
  const details = [
    lead.intent === "callback" ? "Обратный звонок" : "Запрос программы",
    lead.purpose &&
      (lead.purpose === "gift" ? "Поездка в подарок" : "Поездка для себя"),
    lead.name,
    lead.phone,
    (lead.format === "group" ? "Группа" : "Индивидуально") +
      " · " +
      lead.people +
      " чел. · " +
      lead.days +
      " дн.",
    lead.date && "Дата: " + lead.date,
    locations
      .filter((point) => lead.locationIds.includes(point.id))
      .map((point) => point.title)
      .join(", "),
    lead.comment,
  ]
    .filter(Boolean)
    .join("\n");
  try {
    const result = await fetch(
      "https://api.telegram.org/bot" + token + "/sendMessage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: details }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!result.ok) throw new Error("Delivery failed");
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Не удалось отправить заявку. Попробуйте ещё раз." },
      { status: 502 },
    );
  }
}
