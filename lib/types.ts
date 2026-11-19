export type Day = {
  title: string;
  coverLocationId: string;
  stops: {
    title: string;
    text: string;
    locationId?: string;
    optional?: boolean;
  }[];
};
export type Location = {
  id: string;
  title: string;
  area: string;
  text: string;
  coords: [number, number] | null;
  region: "tobolsk" | "abalak";
  image?: string;
  imageAlt?: string;
};
export type ScheduleSlot = {
  starts: string;
  days: number;
  seatsLeft: number;
  demo: boolean;
};
export type Tariff = {
  title: string;
  price: number;
  unit: string;
  includes: string[];
};
export type FAQItem = { question: string; answer: string };
export type { Lead } from "./lead";
