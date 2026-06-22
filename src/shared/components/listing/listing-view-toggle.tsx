"use client";

import { viewModes } from "@/shared/constants/listing.constants";
import { cn } from "@/lib/utils";
import { useListingView } from "./hooks/use-listing-view";

export function ListingViewToggle() {
  const { view, setView } = useListingView();

  return (
    <div className="flex items-center gap-1 rounded-[12px] bg-secondary p-1">
      {viewModes.map(({ id, icon: Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            aria-label={`View ${id}`}
            className={cn(
              "grid size-7.5 place-items-center rounded-[8px] transition-colors cursor-pointer",
              active
                ? "fill-white text-foreground"
                : "fill-black text-muted-foreground hover:bg-muted",
            )}
          >
            <Icon
              className={cn(
                "size-5.5",
                active ? "fill-black" : "fill-[#A8A8AE]",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
