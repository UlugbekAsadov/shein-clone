import { Camera, Search } from "lucide-react";
import { searchCategories } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  placeholder: string;
  searchLabel: string;
};

export function SearchBar({ placeholder, searchLabel }: Props) {
  return (
    <div className="relative flex h-12 flex-1 items-stretch rounded-full bg-muted/60 ring-1 ring-border">
      <Select defaultValue={searchCategories[0].id}>
        <SelectTrigger
          className="h-full! rounded-l-full border-0 bg-transparent pl-5 pr-3 text-sm font-medium text-foreground shadow-none hover:bg-muted/80 focus:ring-0"
          aria-label="Category"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start" position="popper">
          {searchCategories.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-1 items-center pl-2">
        <Search className="size-6 text-muted-foreground" />
        <input
          type="search"
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="button"
          aria-label="Visual search"
          className="rounded-full p-2 text-muted-foreground hover:bg-muted"
        >
          <Camera className="size-6" />
        </button>
      </div>

      <button
        type="button"
        className="rounded-r-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
      >
        {searchLabel}
      </button>
    </div>
  );
}
