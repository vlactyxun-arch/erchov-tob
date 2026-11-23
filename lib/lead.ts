import { z } from "zod";
import locations from "@/content/locations.json";

const tripPurpose = z.enum(["self", "gift"]);
export type TripPurpose = z.infer<typeof tripPurpose>;

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Укажите имя").max(80),
    surname: z
      .string()
      .trim()
      .max(80, "Сократите фамилию до 80 символов")
      .optional(),
    phone: z
      .string()
      .trim()
      .max(25)
      .regex(/^\+?[\d() -]+$/, "Укажите телефон")
      .refine(
        (value) =>
          value.replace(/\D/g, "").length >= 10 &&
          value.replace(/\D/g, "").length <= 15,
        "Введите от 10 до 15 цифр",
      ),
    people: z.coerce
      .number()
      .int()
      .min(1, "Укажите количество гостей")
      .max(100),
    format: z.enum(["group", "individual"]),
    days: z.enum(["2", "3"]),
    intent: z.enum(["callback", "program"]),
    purpose: tripPurpose.optional(),
    comment: z.string().trim().max(1500),
    locationIds: z.array(z.string().max(40)).max(locations.length),
    date: z.union([z.literal(""), z.string().date()]),
    website: z.string().max(0),
    consent: z.boolean().refine(Boolean, "Подтвердите согласие"),
  })
  .superRefine((lead, context) => {
    if (lead.format === "group" && lead.people < 8) {
      context.addIssue({
        code: "custom",
        path: ["people"],
        message: "Групповая программа доступна от 8 человек",
      });
    }
  });
export type Lead = z.infer<typeof leadSchema>;
