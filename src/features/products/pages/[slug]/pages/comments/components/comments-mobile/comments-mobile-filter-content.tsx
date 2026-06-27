"use client";

import { FilterMobileSection } from "@/shared/components/listing/filter-mobile/filter-mobile-section";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import type { ICommentsFilterGroup } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-group.interface";
import type { ICommentsSortControl } from "@/features/products/pages/[slug]/pages/comments/utils/comments-sort.interface";
import { CountedCheckboxList } from "../comments-filter-bar/counted-checkbox-list";
import { CommentsSortList } from "../comments-filter-bar/comments-sort-list";

interface IProps {
  groups: ICommentsFilterGroup[];
  sort: ICommentsSortControl;
}

export function CommentsMobileFilterContent({ groups, sort }: IProps) {
  const dict = useDictionary();

  return (
    <>
      <FilterMobileSection title={dict.comments.filterSort}>
        <CommentsSortList sort={sort} />
      </FilterMobileSection>

      {groups
        .filter((group) => group.options.length > 0)
        .map((group) => (
          <FilterMobileSection key={group.key} title={group.label}>
            <CountedCheckboxList
              options={group.options}
              selected={group.selected}
              onToggle={group.onToggle}
            />
          </FilterMobileSection>
        ))}
    </>
  );
}
