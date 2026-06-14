import type { CSSProperties } from "react";
import type { IApiBadge } from "@/features/home/utils/featured-shop.interface";

interface IProps {
  badge: IApiBadge;
}

export function ShopBadge({ badge }: IProps) {
  const wrapperStyle: CSSProperties = {
    padding: badge.style.wrapper.padding,
    clipPath: badge.style.wrapper.clipPath,
    background: badge.style.wrapper.background,
    borderRadius: badge.style.wrapper.borderRadius,
    display: "flex",
    alignItems: "center",
    gap: "3px",
  };

  const textStyle: CSSProperties = {
    color: badge.style.text.color,
    fontWeight: badge.style.text.fontWeight,
    fontSize: "10px",
    lineHeight: 1,
  };

  return (
    <div style={wrapperStyle}>
      {badge.icon && (
        <span
          className="flex items-center"
          dangerouslySetInnerHTML={{ __html: badge.icon }}
        />
      )}
      <span style={textStyle}>{badge.name}</span>
    </div>
  );
}
