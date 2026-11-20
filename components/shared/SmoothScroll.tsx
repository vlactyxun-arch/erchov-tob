"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { track } from "@/lib/analytics";

export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const configure = () => {
      lenis?.destroy();
      lenis = preference.matches ? undefined : new Lenis({ autoRaf: true });
    };
    const openDetails = (hash: string) => {
      const target = document.getElementById(hash.slice(1));
      if (target instanceof HTMLDetailsElement) target.open = true;
      return target;
    };
    const onHashChange = () => openDetails(location.hash);
    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event
        .composedPath()
        .find(
          (node): node is HTMLAnchorElement =>
            node instanceof HTMLAnchorElement,
        );
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const href = link.getAttribute("href");
      if (!href?.startsWith("#") || href === "#main") return;
      const target = openDetails(href);
      if (!target) return;
      if (!lenis) return;

      event.preventDefault();
      if (location.hash !== href) history.pushState(null, "", href);
      if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
      const distance = Math.abs(target.getBoundingClientRect().top);
      if (link.hasAttribute("data-story-scroll")) {
        lenis.scrollTo(target, {
          duration: Math.min(1.4, 0.85 + distance / 2800),
          easing: (progress) => (1 - Math.cos(Math.PI * progress)) / 2,
        });
        return;
      }

      lenis.scrollTo(target, {
        duration: Math.min(0.72, 0.35 + distance / 5000),
      });
    };
    configure();
    onHashChange();
    document.addEventListener("click", onAnchorClick);
    window.addEventListener("hashchange", onHashChange);
    preference.addEventListener("change", configure);
    const fired = new Set<number>();
    const onScroll = () => {
      const root = document.documentElement;
      const depth =
        (100 * window.scrollY) /
        Math.max(1, root.scrollHeight - window.innerHeight);
      for (const threshold of [25, 40, 75, 90]) {
        if (depth >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          track("scroll_depth", { percent: threshold });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      lenis?.destroy();
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("hashchange", onHashChange);
      preference.removeEventListener("change", configure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
