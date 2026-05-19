import { Shop } from "@solar-icons/react/ssr";
import { Undo2 } from "lucide-react";
import type { ISellerResponse } from "@/features/product/interfaces/review.interface";

interface IProps {
  response: ISellerResponse;
}

export function CommentsMobileSellerResponse({ response }: IProps) {
  return (
    <div className="mt-3 rounded-xl bg-background p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground">
            <Shop className="size-5" weight="Bold" />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">
              {response.shopName}
            </p>
            <p className="text-xs text-muted-foreground">{response.date}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Undo2 className="size-3.5" />
          Seller&apos;s Response
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        {response.text}
      </p>
    </div>
  );
}
