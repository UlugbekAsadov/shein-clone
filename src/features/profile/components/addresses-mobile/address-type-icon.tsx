import { HomeAngle, Suitcase, MapPointWave} from "@solar-icons/react/ssr";

interface IProps {
  type: "home" | "work" | "other";
  className?: string;
}

export function AddressTypeIcon({ type, className }: IProps) {
  if (type === "home") return <HomeAngle className={className} />;
  if (type === "work") return <Suitcase className={className} />;
  return <MapPointWave className={className} />;
}
