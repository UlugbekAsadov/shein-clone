import { Store, CornerUpLeft } from "lucide-react";
import type { ISellerResponse } from "@/features/product/pages/[slug]/utils/review.interface";

interface IProps {
  response: ISellerResponse;
}

export function SellerResponseCard({ response }: IProps) {
  return (
    <div className="mt-4 rounded-xl border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-md bg-muted">
            <Store className="size-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">{response.shopName}</span>
            <span className="text-xs text-muted-foreground">
              {response.date}
            </span>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CornerUpLeft className="size-3.5" />
          Seller&apos;s Response
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed">{response.text}</p>
    </div>
  );
}
