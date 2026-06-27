export function CategoryGroupsListSkeleton() {
  return (
    <ul className="flex flex-col gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <li
          key={i}
          className="flex items-center gap-3 rounded-lg p-2"
        >
          <div className="size-12 shrink-0 rounded-lg bg-muted animate-pulse md:size-14" />
          <div className="h-4 w-32 rounded bg-muted animate-pulse md:h-5 md:w-44" />
          <div className="ml-auto size-5 rounded bg-muted animate-pulse" />
        </li>
      ))}
    </ul>
  );
}
