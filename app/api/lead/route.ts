import { leadSchema } from "@/lib/lead";
import locations from "@/content/locations.json";

function leadHeaders(request: Request) {
  const headers = new Headers({ Vary: "Origin" });
  const origin = request.headers.get("Origin");
  if (origin && origin === process.env.LEAD_ALLOWED_ORIGIN) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  return headers;
}

export function OPTIONS(request: Request) {
  const headers = leadHeaders(request);
  if (!headers.has("Access-Control-Allow-Origin")) {
    return new Response(null, { status: 403, headers });
  }
  headers.set("Access-Control-Allow-Methods", "POST");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return new Response(null, { status: 204, headers });
}

export async function POST(request: Request) {
  const headers = leadHeaders(request);
  const json = (data: object, status = 200) =>
    Response.json(data, { status, headers });
  const raw = await request.text();
  if (raw.length > 12000)
    return json({ error: "Заявка слишком длинная." }, 413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Проверьте данные заявки." }, 400);
  }
  const parsed = leadSchema.safeParse(body);
  if (
    !parsed.success ||
    parsed.data.locationIds.some(
      (id) => !locations.some((point) => point.id === id),
    )
  ) {
    return json({ error: "Проверьте данные заявки." }, 400);
  }

  const {
    TELEGRAM_BOT_TOKEN: token,
    TELEGRAM_CHAT_ID: chatId,
    LEAD_DEMO,
  } = process.env;
  if (LEAD_DEMO === "true") return json({ demo: true });
  if (!token || !chatId) {
    return json({ error: "Приём заявок пока не подключён." }, 503);
  }
  const lead = parsed.data;
  const details = [
    lead.intent === "callback" ? "Обратный звонок" : "Запрос программы",
    lead.purpose &&
      (lead.purpose === "gift" ? "Поездка в подарок" : "Поездка для себя"),
    [lead.name, lead.surname].filter(Boolean).join(" "),
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
    return json({ ok: true });
  } catch {
    return json(
      { error: "Не удалось отправить заявку. Попробуйте ещё раз." },
      502,
    );
  }
}
