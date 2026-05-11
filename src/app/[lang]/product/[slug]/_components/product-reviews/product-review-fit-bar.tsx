import { Progress } from "@/components/ui/progress";
import type { IFitStat } from "../../_lib/interface/review.interface";

interface IProps {
  stat: IFitStat;
}

export function ProductReviewFitBar({ stat }: IProps) {
  return (
    <div className="flex flex-col text-xs gap-1">
      <div className="flex items-center justify-between">
        <span className="w-20 shrink-0 text-muted-foreground">
          {stat.label}
        </span>
        <span className="w-10 shrink-0 text-right font-semibold">
          {stat.percent}%
        </span>
      </div>
      <Progress value={stat.percent} />
    </div>
  );
}
