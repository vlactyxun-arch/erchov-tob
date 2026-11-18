type Event = "cta_click" | "form_submit" | "scroll_depth" | "map_point_click";
type Properties = Record<string, string | number>;
type AnalyticsWindow = Window & {
  ym?: (id: number, action: string, event: string, data: Properties) => void;
};
export function track(event: Event, data: Properties = {}) {
  window.dispatchEvent(
    new CustomEvent("tobolsk:analytics", { detail: { event, data } }),
  );
  const id = Number(process.env.NEXT_PUBLIC_METRIKA_ID);
  if (id) (window as AnalyticsWindow).ym?.(id, "reachGoal", event, data);
}
