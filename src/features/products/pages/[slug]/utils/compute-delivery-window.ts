import type { IShippingStep } from "./shipping-step.interface";
import { UZ_SHORT_MONTHS } from "./uz-months.constants";

interface IDeliveryWindow {
  minDate: Date;
  maxDate: Date;
}

function addDays(from: Date, days: number): Date {
  const result = new Date(from);
  result.setDate(result.getDate() + days);
  return result;
}

export function computeDeliveryWindow(
  steps: IShippingStep[],
  from: Date,
): IDeliveryWindow | null {
  const activeSteps = steps.filter((step) => step.is_active);
  if (activeSteps.length === 0) return null;

  const minDays = activeSteps.reduce((sum, step) => sum + step.min_days, 0);
  const maxDays = activeSteps.reduce((sum, step) => sum + step.max_days, 0);

  return {
    minDate: addDays(from, minDays),
    maxDate: addDays(from, maxDays),
  };
}

function formatUzDate(date: Date): string {
  return `${date.getDate()}-${UZ_SHORT_MONTHS[date.getMonth()]}`;
}

export function formatDeliveryWindow(
  window: IDeliveryWindow,
  locale: string,
): string {
  if (locale === "uz") {
    return `${formatUzDate(window.minDate)} - ${formatUzDate(window.maxDate)}`;
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  });
  return `${formatter.format(window.minDate)} - ${formatter.format(window.maxDate)}`;
}
