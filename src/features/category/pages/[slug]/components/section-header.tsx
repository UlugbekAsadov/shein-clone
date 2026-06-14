import type { IApiCategorySection } from "@/features/category/pages/[slug]/utils/category-section.interface";

interface IProps {
  section: IApiCategorySection;
  total: number;
}

function getContrastColor(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 160 ? "#1a1a1a" : "#ffffff";
}

export function SectionHeader({ section, total }: IProps) {
  const textColor = getContrastColor(section.bg_color);
  const mutedColor = `${textColor}b3`;

  return (
    <div style={{ backgroundColor: section.bg_color }}>
      <div className="mx-auto max-w-360 px-4 py-4 md:px-6 md:py-6">
        <div className="flex items-center gap-2">
          {section.icon && (
            <span
              style={{ color: textColor }}
              dangerouslySetInnerHTML={{ __html: section.icon }}
            />
          )}
          <h1
            style={{ color: textColor }}
            className="text-xl font-bold md:text-2xl"
          >
            {section.name}
          </h1>
        </div>
        {section.description && (
          <p style={{ color: mutedColor }} className="mt-1 text-sm">
            {section.description}
          </p>
        )}
        <p style={{ color: mutedColor }} className="mt-1 text-sm font-medium">
          {total}
        </p>
      </div>
    </div>
  );
}
