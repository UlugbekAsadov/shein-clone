import {
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Store,
  ThumbsUp,
  Truck,
} from "lucide-react";
import type { IAboutInfoItem } from "@/features/shop/interfaces/about-info.interface";

interface IProps {
  name: IAboutInfoItem["icon"];
}

export function InfoCardIcon({ name }: IProps) {
  const className = "size-5 text-foreground";
  switch (name) {
    case "mapPin":
      return <MapPin className={className} />;
    case "truck":
      return <Truck className={className} />;
    case "store":
      return <Store className={className} />;
    case "shieldCheck":
      return <ShieldCheck className={className} />;
    case "thumbsUp":
      return <ThumbsUp className={className} />;
    case "messageSquare":
      return <MessageSquare className={className} />;
    case "clock":
      return <Clock className={className} />;
  }
}
