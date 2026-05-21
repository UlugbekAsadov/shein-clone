import Image from "next/image";

export function LoginPreview() {
  return (
    <div className="relative hidden h-full w-full overflow-hidden bg-secondary lg:block">
      <Image
        src="/images/login-page-image.webp"
        alt=""
        fill
        priority
        sizes="50vw"
        className="object-contain object-bottom-right"
        quality={100}
        unoptimized
      />
    </div>
  );
}
