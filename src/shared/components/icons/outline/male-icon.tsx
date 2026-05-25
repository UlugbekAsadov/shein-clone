import type { IIconProps } from "../icon.interface";

export const MaleIcon = (props: IIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
      fill="currentColor"
    />
    <path
      d="M4 21C4 16.5817 7.58172 14 12 14C16.4183 14 20 16.5817 20 21H4Z"
      fill="currentColor"
    />
    <path d="M11 14L12 17L13 14L12.7 21H11.3L11 14Z" fill="#FAFAFA" />
  </svg>
);
