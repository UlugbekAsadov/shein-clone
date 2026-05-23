"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Magnifer, Cursor } from "@solar-icons/react";
import { Plus, Minus } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { AddressesMobileHeader } from "@/features/profile/components/addresses-mobile/addresses-mobile-header";
import { AddressTypeIcon } from "@/features/profile/components/addresses-mobile/address-type-icon";
import { YandexMap, type IMapApi, type ICoords } from "./yandex-map";
import {
  forwardGeocode,
  reverseGeocode,
  suggest,
  type ISuggestion,
} from "./yandex-map-loader";
import { MapPointSolid } from "@/shared/components/icons/solid";
import { MapArrowRight } from "@solar-icons/react/ssr";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  apiKey: string;
}

const DEFAULT_CENTER: ICoords = { lng: 69.279, lat: 41.311 };

export function AddressMapMobilePage({ lang, dict, apiKey }: IProps) {
  const t = dict.profile.addresses;
  const router = useRouter();
  const params = useSearchParams();

  const type = (params.get("type") ?? "other") as "home" | "work" | "other";
  const initialName = params.get("name") ?? "";
  const initialAddress = params.get("address") ?? "";

  const mapRef = useRef<IMapApi | null>(null);
  const [center, setCenter] = useState<ICoords>(DEFAULT_CENTER);
  const [addressTitle, setAddressTitle] = useState(
    initialName || t.types[type],
  );
  const [addressText, setAddressText] = useState(initialAddress);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    let cancelled = false;
    reverseGeocode(center.lng, center.lat).then((result) => {
      if (cancelled || !result) return;
      setAddressTitle(result.name);
      setAddressText(result.description || result.addressLine);
    });
    return () => {
      cancelled = true;
    };
  }, [center.lng, center.lat]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    const handle = setTimeout(() => {
      suggest(searchQuery).then((items) => {
        if (!cancelled) setSuggestions(items);
      });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [searchQuery]);

  const applyGeocodeResult = async (query: string) => {
    const result = await forwardGeocode(query);
    if (!result) return;
    mapRef.current?.setCenter({ lng: result.lng, lat: result.lat }, 16);
    setAddressTitle(result.name);
    setAddressText(result.description || result.addressLine);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    const first = suggestions[0];
    const query = first?.value ?? searchQuery;
    setSearchQuery(first?.displayName ?? searchQuery);
    setSuggestions([]);
    setSearchFocused(false);
    await applyGeocodeResult(query);
  };

  const handleSelectSuggestion = async (item: ISuggestion) => {
    setSearchQuery(item.displayName);
    setSuggestions([]);
    setSearchFocused(false);
    await applyGeocodeResult(item.value);
  };

  const handleConfirm = () => {
    const search = new URLSearchParams();
    search.set("type", type);
    if (addressTitle) search.set("name", addressTitle);
    if (addressText) search.set("address", addressText);
    search.set("lat", String(center.lat));
    search.set("long", String(center.lng));
    const editId = params.get("id");
    if (editId) search.set("id", editId);
    const target = editId
      ? `/${lang}/profile/addresses/${editId}/edit`
      : `/${lang}/profile/addresses/new`;
    router.replace(`${target}?${search.toString()}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col md:hidden">
      <AddressesMobileHeader
        title={t.map.title}
        fallbackHref={`/${lang}/profile/addresses/new?type=${type}`}
      />

      <div className="relative flex-1">
        <YandexMap
          ref={mapRef}
          apiKey={apiKey}
          initialCenter={DEFAULT_CENTER}
          initialZoom={15}
          onCenterChange={setCenter}
        />

        <div className="pointer-events-none absolute inset-x-0 top-3 px-4">
          <form
            onSubmit={handleSearch}
            className="pointer-events-auto flex items-center gap-2.5 rounded-sm bg-background px-4 py-3.5 shadow-md"
          >
            <Magnifer className="size-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => setSearchFocused(false), 150);
              }}
              placeholder={t.map.searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-secondary-foreground focus:outline-none placeholder:text-sm"
            />
          </form>

          {searchFocused && suggestions.length > 0 && (
            <ul className="pointer-events-auto z-5 relative mt-2 max-h-80 overflow-y-auto rounded-sm bg-background shadow-md">
              {suggestions.map((item) => (
                <li key={item.value}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelectSuggestion(item)}
                    className="flex w-full items-start gap-2.5 border-b border-border px-4 py-3 text-left last:border-b-0 active:bg-secondary"
                  >
                    <Magnifer className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {item.displayName}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
        >
          <MapPointSolid className="size-12" />
        </div>

        <div className="pointer-events-none absolute right-3 bottom-20 flex flex-col gap-2">
          <div className="flex flex-col bg-background rounded-sm shadow-md ">
            <button
              type="button"
              onClick={() => mapRef.current?.zoomIn()}
              aria-label="Zoom in"
              className="pointer-events-auto grid size-11 place-items-center border-b border-border"
            >
              <Plus className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => mapRef.current?.zoomOut()}
              aria-label="Zoom out"
              className="pointer-events-auto grid size-11 place-items-center"
            >
              <Minus className="size-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => mapRef.current?.setCenter(DEFAULT_CENTER, 15)}
            aria-label="My location"
            className="pointer-events-auto grid size-11 place-items-center rounded-sm bg-background text-foreground shadow-md"
          >
            <MapArrowRight className="size-5 -rotate-45" weight="Bold" />
          </button>
        </div>
      </div>

      <div className="relative z-10 -mt-6 rounded-t-3xl bg-background pt-3 pb-[max(env(safe-area-inset-bottom),1rem)]">
        <span
          aria-hidden
          className="mx-auto mb-3 block h-1 w-10 rounded-full bg-border"
        />
        <div className="px-4">
          <h2 className="text-base font-bold text-foreground">
            {t.map.addressLabel}
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground">
              <AddressTypeIcon type={type} className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">
                {addressTitle}
              </p>
              <p className="truncate text-xs font-regular text-muted-foreground">
                {addressText}
              </p>
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            onClick={handleConfirm}
            className="mt-4 h-12.5 w-full rounded-sm text-base font-semibold"
          >
            {t.map.confirm}
          </Button>
        </div>
      </div>
    </div>
  );
}
