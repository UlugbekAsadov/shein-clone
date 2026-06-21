import type { Metadata } from "next";
import { env } from "@/core/config/env";

const SITE_NAME = "2020Mall";

const OG_LOCALES: Record<string, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

export function toAbsoluteUrl(value: string): string {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${env.siteUrl}${value.startsWith("/") ? "" : "/"}${value}`;
}

interface IBuildMetadataInput {
  title: string;
  description: string;
  path: string;
  images?: string[];
  type?: "website" | "article" | "profile";
  locale: string;
}

export function buildMetadata(input: IBuildMetadataInput): Metadata {
  const url = toAbsoluteUrl(input.path);
  const images = (input.images ?? []).filter(Boolean).map(toAbsoluteUrl);
  const title = `${input.title} | ${SITE_NAME}`;

  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: input.type ?? "website",
      url,
      title,
      description: input.description,
      siteName: SITE_NAME,
      locale: OG_LOCALES[input.locale] ?? OG_LOCALES.en,
      images: images.map((image) => ({ url: image })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images,
    },
  };
}
