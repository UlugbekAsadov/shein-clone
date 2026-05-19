import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { OrderDetailMobilePage } from "@/features/profile/components/order-detail-mobile/order-detail-mobile-page";
import { getOrderDetailById } from "@/features/profile/mocks/order-detail.mocks";

export default async function OrderDetailPage({
  params,
}: PageProps<"/[lang]/orders/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const order = getOrderDetailById(id);
  if (!order) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="flex-1">
      <OrderDetailMobilePage order={order} dict={dict} />
    </main>
  );
}
