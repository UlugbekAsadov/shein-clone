import { OrdersMobileTabItem } from "./orders-mobile-tab-item";

export type OrdersMobileTabId = "active" | "history";

interface IProps {
  active: OrdersMobileTabId;
  onChange: (id: OrdersMobileTabId) => void;
  activeLabel: string;
  historyLabel: string;
}

export function OrdersMobileTabs({
  active,
  onChange,
  activeLabel,
  historyLabel,
}: IProps) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-secondary p-1">
      <OrdersMobileTabItem
        label={activeLabel}
        active={active === "active"}
        onClick={() => onChange("active")}
      />
      <OrdersMobileTabItem
        label={historyLabel}
        active={active === "history"}
        onClick={() => onChange("history")}
      />
    </div>
  );
}
