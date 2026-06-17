import type { CSSProperties } from "react";
import type {
  ISolidBg,
  ILinearGradientBg,
  IRadialGradientBg,
  IImageBg,
} from "@/features/home/utils/product-section.interface";

export function parseBgColor(
  raw: string | ISolidBg | ILinearGradientBg | IRadialGradientBg | IImageBg,
): ISolidBg | ILinearGradientBg | IRadialGradientBg | IImageBg {
  if (typeof raw !== "string") return raw;
  if (raw.startsWith("#") || raw.startsWith("rgb")) {
    return { type: "solid", color: raw };
  }
  try {
    return JSON.parse(raw) as ISolidBg | ILinearGradientBg | IRadialGradientBg | IImageBg;
  } catch {
    return { type: "solid", color: raw };
  }
}

export function getBgStyle(
  bg: ISolidBg | ILinearGradientBg | IRadialGradientBg | IImageBg,
): CSSProperties {
  if (bg.type === "solid") {
    return { backgroundColor: bg.color };
  }
  if (bg.type === "linearGradient") {
    const angle =
      Math.atan2(bg.end.x - bg.begin.x, -(bg.end.y - bg.begin.y)) *
      (180 / Math.PI);
    return {
      backgroundImage: `linear-gradient(${Math.round(angle)}deg, ${bg.colors.join(", ")})`,
    };
  }
  if (bg.type === "radialGradient") {
    const stops = bg.colors.join(", ");
    return {
      backgroundImage: `radial-gradient(circle at ${bg.center.x * 100}% ${bg.center.y * 100}%, ${stops})`,
    };
  }
  return {
    backgroundImage: `url(${bg.url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

export function getBgPrimaryHex(
  bg: ISolidBg | ILinearGradientBg | IRadialGradientBg | IImageBg,
): string | undefined {
  if (bg.type === "solid") return bg.color;
  if (bg.type === "linearGradient" || bg.type === "radialGradient")
    return bg.colors[0];
  return undefined;
}
