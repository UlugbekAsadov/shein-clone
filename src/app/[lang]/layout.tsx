import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "./globals.css";
import { cn } from "@/lib/utils";
import { hasLocale, locales } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { env } from "@/core/config/env";
import { Providers } from "@/core/providers/providers";
import { MobileBottomNav } from "@/shared/components/mobile-bottom-nav/mobile-bottom-nav";
import { SquircleClipPath } from "@/shared/components/category/squircle-clip-path";
import { PolicyBanner } from "@/shared/components/policy-banner/policy-banner";

const googleSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../../../public/fonts/google_sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
      weight: "400 700",
    },
    {
      path: "../../../public/fonts/google_sans/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
      weight: "400 700",
    },
  ],
});

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/demo">): Promise<Metadata> {
  const { lang } = await params;
  const metadataBase = new URL(env.siteUrl);
  if (!hasLocale(lang))
    return { metadataBase, title: "2020mall", description: "2020mall client" };
  const dict = await getDictionary(lang);
  const title = dict.site?.title ?? "2020mall";
  const description = dict.site?.metaDescription ?? "2020mall client";
  const ogLocale =
    lang === "uz" ? "uz_UZ" : lang === "ru" ? "ru_RU" : "en_US";
  return {
    metadataBase,
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "2020Mall",
      locale: ogLocale,
      title,
      description,
      url: `${env.siteUrl}/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={cn(
        "h-full",
        "antialiased",
        googleSans.variable,
        "font-sans",
        "scrollbar-hidden"
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SquircleClipPath />
        <Providers dict={dict}>
          <Suspense fallback={null}>
            {children}
            <MobileBottomNav lang={lang} dict={dict} />
            <PolicyBanner dict={dict} />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
