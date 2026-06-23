export function CartSkeleton() {
  return (
    <div className="mx-auto grid max-w-360 gap-6 px-6 py-8 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-4">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex gap-4 rounded-xl border border-border p-4"
          >
            <div className="aspect-3/4 w-24 shrink-0 animate-pulse rounded-lg bg-muted" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
              <div className="mt-auto h-6 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
