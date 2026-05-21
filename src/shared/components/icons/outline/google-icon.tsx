interface IProps {
  className?: string;
}

export function GoogleIcon({ className }: IProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M23.06 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.2a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.18-2 3.44-4.96 3.44-8.39Z"
        fill="#4285F4"
      />
      <path
        d="M12 23.5c3.1 0 5.7-1.03 7.62-2.79l-3.72-2.89c-1.03.7-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.74H1.7v2.98A11.5 11.5 0 0 0 12 23.5Z"
        fill="#34A853"
      />
      <path
        d="M5.55 14.18a6.92 6.92 0 0 1 0-4.36V6.84H1.7a11.5 11.5 0 0 0 0 10.32l3.85-2.98Z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.86c1.69 0 3.2.58 4.4 1.72l3.29-3.29C17.7 1.43 15.1.5 12 .5 7.42.5 3.46 3.13 1.7 6.84l3.85 2.98C6.46 7.1 9 5.08 12 5.08v-.22Z"
        fill="#EA4335"
      />
    </svg>
  );
}
