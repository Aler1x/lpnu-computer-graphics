import type { LucideIcon } from "lucide-react";
import { Hexagon, Palette, Pentagon } from "lucide-react";

export type AppRoute = {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
};

export const APP_ROUTES: readonly AppRoute[] = [
  {
    title: "Фрактали",
    description: "Ньютон і Вічек",
    path: "/",
    icon: Hexagon,
  },
  {
    title: "Кольори",
    description: "HSL та CMYK",
    path: "/colors",
    icon: Palette,
  },
  {
    title: "Фігури",
    description: "Паралелограм",
    path: "/shapes",
    icon: Pentagon,
  },
] as const;
