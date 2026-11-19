"use client";

import { Button as HeroButton, type ButtonProps } from "@heroui/button";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonProps) {
  return (
    <HeroButton
      color="primary"
      disableAnimation
      disableRipple
      className={cn("button", className)}
      {...props}
    />
  );
}
