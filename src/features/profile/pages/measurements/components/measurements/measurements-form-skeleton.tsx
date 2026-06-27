export function MeasurementsFormSkeleton() {
  return (
    <div>
      <div className="h-7 w-40 rounded bg-muted animate-pulse" />
      <div className="my-5 border-t border-border" />

      <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[140px_1fr] items-center gap-4">
            <div className="h-5 w-24 rounded bg-muted animate-pulse" />
            <div className="h-12 w-full rounded-sm bg-muted animate-pulse" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <div className="h-12.5 w-32 rounded-sm bg-muted animate-pulse" />
      </div>
    </div>
  );
}
