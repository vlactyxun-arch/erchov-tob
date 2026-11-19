export type CookieConsent = "necessary" | "analytics";

export const cookieConsentKey = "tobolsk-cookie-consent-v1";
let sessionChoice: CookieConsent | null = null;

export function readCookieConsent(): CookieConsent | null {
  if (sessionChoice !== null) return sessionChoice;

  try {
    const value = window.localStorage.getItem(cookieConsentKey);
    return value === "necessary" || value === "analytics" ? value : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice: CookieConsent) {
  try {
    window.localStorage.setItem(cookieConsentKey, choice);
    sessionChoice = null;
  } catch {
    sessionChoice = choice;
  }
}
