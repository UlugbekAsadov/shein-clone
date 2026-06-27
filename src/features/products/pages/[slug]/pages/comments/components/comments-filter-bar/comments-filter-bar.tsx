import { FilterBarDropdown } from "@/shared/components/listing/filter-bar/filter-bar-dropdown";
import type { ICommentsFilterGroup } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-group.interface";
import type { ICommentsSortControl } from "@/features/products/pages/[slug]/pages/comments/utils/comments-sort.interface";
import { CountedCheckboxList } from "./counted-checkbox-list";
import { CommentsSortList } from "./comments-sort-list";

interface IProps {
  groups: ICommentsFilterGroup[];
  sort: ICommentsSortControl;
  sortLabel: string;
}

export function CommentsFilterBar({ groups, sort, sortLabel }: IProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterBarDropdown label={sortLabel}>
        <div className="w-44">
          <CommentsSortList sort={sort} />
        </div>
      </FilterBarDropdown>

      {groups
        .filter((group) => group.options.length > 0)
        .map((group) => (
          <FilterBarDropdown
            key={group.key}
            label={group.label}
            count={group.selected.length}
            onClear={group.onClear}
          >
            <div className="w-56">
              <CountedCheckboxList
                options={group.options}
                selected={group.selected}
                onToggle={group.onToggle}
              />
            </div>
          </FilterBarDropdown>
        ))}
    </div>
  );
}
