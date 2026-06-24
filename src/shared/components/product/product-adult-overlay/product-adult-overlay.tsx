import { EyeClosed } from "@solar-icons/react";

export function ProductAdultOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
      <EyeClosed weight="Linear" className="size-12 text-white drop-shadow-md" />
    </div>
  );
}
