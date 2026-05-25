import { HomeAngle, Suitcase, MapPointWave} from "@solar-icons/react/ssr";

interface IProps {
  icon_type: "home" | "work" | "other";
  className?: string;
}

export function AddressTypeIcon({ icon_type, className }: IProps) {
  if (icon_type === "home") return <HomeAngle className={className} />;
  if (icon_type === "work") return <Suitcase className={className} />;
  return <MapPointWave className={className} />;
}
