import type { IIconProps } from "../icon.interface";

export const RussiaFlagIcon = (props: IIconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 8.59769H0V4.17239C0 3.96292 0.169855 3.79306 0.379327 3.79306H21.6207C21.8301 3.79306 22 3.96292 22 4.17239L22 8.59769Z"
      fill="#F5F5F5"
    />
    <path
      d="M21.6206 18.2069H0.379327C0.169855 18.2069 0 18.037 0 17.8275V13.4023H22V17.8275C22 18.0371 21.8301 18.2069 21.6206 18.2069Z"
      fill="#FF4B55"
    />
    <path d="M22 8.5976H0V13.4019H22V8.5976Z" fill="#41479B" />
  </svg>
);
