import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { CommentsPage } from "@/features/products/pages/[slug]/pages/comments/pages/comments.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/products/[slug]/comments">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <CommentsPage lang={lang} dict={dict} slug={slug} />;
}
