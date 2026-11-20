"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LeadPreset } from "@/components/shared/LeadLink";
import { Button } from "@/components/ui/button";
import { leadSchema, type Lead } from "@/lib/lead";
import { track } from "@/lib/analytics";
import places from "@/content/locations.json";
import { publicPath } from "@/lib/public-path";
import { HorseAppears } from "@/components/shared/HorseMark";

const defaults: Lead = {
  name: "",
  phone: "",
  people: 8,
  format: "group",
  days: "2",
  intent: "callback",
  purpose: "self",
  comment: "",
  locationIds: [],
  date: "",
  website: "",
  consent: false,
};

export function Contact() {
  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: defaults,
  });
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  }>();
  const format = watch("format");
  const intent = watch("intent");
  useEffect(() => {
    const applyPreset = (event: Event) => {
      const preset = (event as CustomEvent<LeadPreset>).detail;
      setStatus(undefined);
      const next = preset.format ?? getValues("format");
      setValue("format", next);
      setValue(
        "people",
        Math.max(
          next === "group" ? 8 : 1,
          preset.people ?? getValues("people"),
        ),
      );
      setValue("date", preset.date ?? "");
      if (preset.intent) setValue("intent", preset.intent);
      if (preset.purpose) setValue("purpose", preset.purpose);
      if (preset.days) setValue("days", preset.days);
    };
    window.addEventListener("tobolsk:lead", applyPreset);
    return () => window.removeEventListener("tobolsk:lead", applyPreset);
  }, [getValues, setValue]);

  const send = handleSubmit(async (values) => {
    setStatus(undefined);
    try {
      const result = await fetch(publicPath("/api/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          locationIds: values.format === "group" ? [] : values.locationIds,
        }),
      });
      const data = await result.json();
      if (!result.ok || (!data.ok && !data.demo))
        throw new Error(data.error ?? "Попробуйте отправить заявку ещё раз.");
      if (data.ok)
        track("form_submit", {
          format: values.format,
          intent: values.intent,
          days: values.days,
        });
      setStatus({
        type: "success",
        message: data.demo
          ? "Форма проверена в режиме предпросмотра."
          : "Спасибо! Позвоним вам по указанному номеру.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error && !(error instanceof TypeError)
            ? error.message
            : "Связь прервалась. Попробуйте ещё раз.",
      });
    }
  });

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-layout">
          <div className="contact-copy">
            <p id="contact-title" className="intro">
              Оставьте номер. Позвоним, чтобы обсудить даты, ночлег и места,
              которые вы хотите увидеть.
            </p>
            <p>
              Готовые программы доступны для компаний от восьми человек. Для
              меньшей компании выберите индивидуальный формат.
            </p>
            <HorseAppears className="contact-horse" />
          </div>
          <form onSubmit={send} noValidate className="lead-form">
            <fieldset>
              <legend>Цель заявки</legend>
              <div className="choices">
                <label>
                  <input
                    type="radio"
                    value="callback"
                    {...register("intent")}
                  />{" "}
                  Обратный звонок
                </label>
                <label>
                  <input type="radio" value="program" {...register("intent")} />{" "}
                  Запрос программы
                </label>
              </div>
            </fieldset>
            <div className="fields">
              <label>
                Для кого поездка?
                <select {...register("purpose")}>
                  <option value="self">Для себя</option>
                  <option value="gift">В подарок</option>
                </select>
              </label>
              <label>
                Имя
                <input
                  autoComplete="name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "lead-name-error" : undefined}
                />
                {errors.name && (
                  <span className="error" id="lead-name-error">
                    {errors.name.message}
                  </span>
                )}
              </label>
              <label>
                Телефон
                <input
                  type="tel"
                  autoComplete="tel"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={
                    errors.phone ? "lead-phone-error" : undefined
                  }
                  placeholder="+7 900 000-00-00"
                />
                {errors.phone && (
                  <span className="error" id="lead-phone-error">
                    {errors.phone.message}
                  </span>
                )}
              </label>
              <label>
                Формат
                <select
                  {...register("format", {
                    onChange: (event) => {
                      if (event.target.value === "group")
                        setValue(
                          "people",
                          Math.max(8, Number(getValues("people")) || 8),
                        );
                      else setValue("date", "");
                    },
                  })}
                >
                  <option value="group">Группа</option>
                  <option value="individual">Индивидуально</option>
                </select>
              </label>
              <label>
                Количество гостей
                <input
                  type="number"
                  min={format === "group" ? 8 : 1}
                  max={100}
                  {...register("people", { valueAsNumber: true })}
                  aria-invalid={!!errors.people}
                  aria-describedby={
                    errors.people ? "lead-people-error" : undefined
                  }
                />
                {errors.people && (
                  <span className="error" id="lead-people-error">
                    {errors.people.message}
                  </span>
                )}
              </label>
              <label>
                Продолжительность
                <select
                  {...register("days", {
                    onChange: () => setValue("date", ""),
                  })}
                >
                  <option value="2">2 дня</option>
                  <option value="3">3 дня</option>
                </select>
              </label>
              <label>
                Желаемая дата
                <input
                  type="date"
                  {...register("date")}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "lead-date-error" : undefined}
                />
                {errors.date && (
                  <span className="error" id="lead-date-error">
                    Проверьте дату
                  </span>
                )}
              </label>
            </div>
            {format === "individual" && (
              <fieldset>
                <legend>Что хотите увидеть?</legend>
                <div className="choices points">
                  {places.map((place) => (
                    <label key={place.id}>
                      <input
                        type="checkbox"
                        value={place.id}
                        {...register("locationIds")}
                      />{" "}
                      {place.title}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            <label>
              Комментарий
              <textarea
                rows={3}
                maxLength={1500}
                placeholder="Размещение, интересы или особые пожелания"
                {...register("comment")}
              />
            </label>
            <label hidden>
              Сайт
              <input
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </label>
            <label className="consent">
              <input
                type="checkbox"
                {...register("consent")}
                aria-invalid={!!errors.consent}
                aria-describedby={
                  errors.consent ? "lead-consent-error" : undefined
                }
              />
              <span>
                Согласен на{" "}
                <a href="#privacy">обработку данных для ответа на заявку</a>
              </span>
            </label>
            {errors.consent && (
              <span className="error" id="lead-consent-error">
                {errors.consent.message}
              </span>
            )}
            <Button type="submit" isDisabled={isSubmitting}>
              {isSubmitting
                ? "Отправляем…"
                : intent === "program"
                  ? "Запросить программу"
                  : "Заказать звонок"}
            </Button>
            {status && (
              <p
                className={status.type === "error" ? "error" : "success"}
                role={status.type === "error" ? "alert" : "status"}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
        <details id="privacy">
          <summary>Обработка данных</summary>
          <p>
            Имя, телефон и параметры поездки используются для ответа на заявку.
            Реквизиты организатора, условия обработки и контакты для отзыва
            согласия публикуются перед запуском приёма заявок.
          </p>
        </details>
      </div>
    </section>
  );
}
