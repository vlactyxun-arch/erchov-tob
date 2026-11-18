"use client";

import { HeroUIProvider } from "@heroui/system";
import { Motion } from "./Motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider locale="ru-RU">
      <Motion>{children}</Motion>
    </HeroUIProvider>
  );
}
