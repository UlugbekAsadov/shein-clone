import type { IAboutInfoItem } from "@/features/shop/interfaces/about-info.interface";
import {
  ChatRoundLine,
  ClockCircle,
  Like,
  MapPointWave,
  Shop,
  VerifiedCheck,
} from "@solar-icons/react";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { cn } from "@/lib/utils";

interface IProps {
  name: IAboutInfoItem["icon"];
}

export function InfoCardIcon({ name }: IProps) {
  const className = "size-7 text-foreground";
  switch (name) {
    case "mapPin":
      return <MapPointWave className={className} weight="Bold" />;
    case "truck":
      return <TruckIconSolid className={className} />;
    case "store":
      return <Shop className={className} weight="Bold" />;
    case "shieldCheck":
      return (
        <VerifiedCheck
          className={cn(className, "text-[#387FF1]")}
          weight="Bold"
        />
      );
    case "thumbsUp":
      return <Like className={className} weight="Bold" />;
    case "messageSquare":
      return <ChatRoundLine className={className} weight="Bold" />;
    case "clock":
      return <ClockCircle className={className} weight="Bold" />;
  }
}
