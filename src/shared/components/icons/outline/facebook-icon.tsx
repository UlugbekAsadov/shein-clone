interface IProps {
  className?: string;
}

export function FacebookIcon({ className }: IProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 5.99 4.39 10.96 10.13 11.85v-8.38H7.08V12h3.05V9.35c0-3.01 1.8-4.67 4.54-4.67 1.31 0 2.69.23 2.69.23v2.96h-1.51c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38C19.61 22.96 24 17.99 24 12Z"
        fill="#1877F2"
      />
      <path
        d="M16.67 15.47 17.2 12h-3.33V9.74c0-.94.47-1.87 1.96-1.87h1.51V4.9s-1.38-.23-2.69-.23c-2.74 0-4.54 1.66-4.54 4.67V12H7.08v3.47h3.05v8.38c1.23.19 2.48.19 3.7 0v-8.38h2.84Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
