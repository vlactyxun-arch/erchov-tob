"use client";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { TripPurpose } from "@/lib/lead";
import { Button } from "@heroui/button";

export type LeadPreset = {
  purpose?: TripPurpose;
  intent?: "callback" | "program";
  format?: "group" | "individual";
  people?: number;
  days?: "2" | "3";
  date?: string;
};
export function LeadLink({
  children,
  preset = {},
  source,
  className,
}: {
  children: React.ReactNode;
  preset?: LeadPreset;
  source: string;
  className?: string;
}) {
  return (
    <Button
      as="a"
      href="#contact"
      color="primary"
      disableAnimation
      disableRipple
      className={cn("button", className)}
      onPress={() => {
        window.dispatchEvent(
          new CustomEvent("tobolsk:lead", {
            detail: { intent: "callback", ...preset },
          }),
        );
        track("cta_click", { source, intent: preset.intent ?? "callback" });
      }}
    >
      {children}
    </Button>
  );
}
