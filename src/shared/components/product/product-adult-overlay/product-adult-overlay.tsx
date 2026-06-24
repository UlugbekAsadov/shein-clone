import { EyeOffIcon } from "../../icons/outline/eye-off-icon";

export function ProductAdultOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
      <EyeOffIcon className="size-11.5 text-white drop-shadow-md" />
    </div>
  );
}
