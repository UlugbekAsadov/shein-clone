import { Logout } from "@solar-icons/react/ssr";

interface IProps {
  label: string;
}

export function ProfileMobileLogout({ label }: IProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-[18px] bg-secondary px-4 py-3.5 text-left"
    >
      <Logout className="size-6 -scale-x-100 text-rose-500" />
      <span className="text-base font-medium text-rose-500">{label}</span>
    </button>
  );
}
