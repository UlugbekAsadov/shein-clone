import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { cn } from "@/lib/utils";
import { hasLocale, locales } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { env } from "@/core/config/env";
import { Providers } from "@/core/providers/providers";
import { getCurrentUser } from "@/features/auth/services/auth.service";
import { MobileBottomNav } from "@/shared/components/mobile-bottom-nav/mobile-bottom-nav";
import { SquircleClipPath } from "@/shared/components/category/squircle-clip-path";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  const user = await getCurrentUser();

  return (
    <html
      lang={lang}
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        "scrollbar-hidden"
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SquircleClipPath />
        <Providers user={user} dict={dict}>
          {children}
          <MobileBottomNav lang={lang} dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
