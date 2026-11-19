"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  cookieConsentKey,
  readCookieConsent,
  saveCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const settings = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const openedFromSettings = useRef(false);

  useEffect(() => {
    const sync = () => setVisible(readCookieConsent() === null);
    const onStorage = (event: StorageEvent) => {
      if (event.key === cookieConsentKey || event.key === null) sync();
    };
    sync();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (visible && openedFromSettings.current) heading.current?.focus();
  }, [visible]);

  function choose(choice: CookieConsent) {
    saveCookieConsent(choice);
    setVisible(false);
    if (openedFromSettings.current) {
      openedFromSettings.current = false;
      settings.current?.focus({ preventScroll: true });
    }
  }

  return (
    <>
      <button
        ref={settings}
        type="button"
        className="cookie-settings"
        aria-expanded={visible}
        onClick={() => {
          openedFromSettings.current = true;
          if (visible) heading.current?.focus();
          else setVisible(true);
        }}
      >
        Настройки cookies
      </button>
      {visible && (
        <aside className="cookie-notice" aria-labelledby="cookie-notice-title">
          <div className="cookie-copy">
            <h2 id="cookie-notice-title" ref={heading} tabIndex={-1}>
              Cookies и аналитика
            </h2>
            <p>
              Мы запоминаем ваш выбор. Аналитика помогает понять, какими
              разделами и кнопками пользуются посетители.
            </p>
          </div>
          <div className="cookie-actions">
            <Button
              className="button-outline"
              onPress={() => choose("necessary")}
            >
              Только необходимые
            </Button>
            <Button onPress={() => choose("analytics")}>
              Разрешить аналитику
            </Button>
          </div>
        </aside>
      )}
    </>
  );
}
