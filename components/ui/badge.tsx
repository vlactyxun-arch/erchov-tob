"use client";

import { Chip } from "@heroui/chip";

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <Chip classNames={{ base: "badge", content: "px-0" }}>{children}</Chip>
  );
}
