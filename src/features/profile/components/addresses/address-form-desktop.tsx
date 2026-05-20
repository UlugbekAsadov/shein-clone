"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "@solar-icons/react";
import { MapArrowRight } from "@solar-icons/react/ssr";
import { Plus, Minus } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { MapPointSolid } from "@/shared/components/icons/solid";
import {
  YandexMap,
  type IMapApi,
  type ICoords,
} from "@/features/profile/components/address-map-mobile/yandex-map";
import {
  forwardGeocode,
  reverseGeocode,
  suggest,
  type ISuggestion,
} from "@/features/profile/components/address-map-mobile/yandex-map-loader";
import { AddressTypeIconButton } from "./address-type-icon-button";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  apiKey: string;
}

const DEFAULT_CENTER: ICoords = { lng: 69.279, lat: 41.311 };

const TYPES: Array<"home" | "other" | "work"> = ["home", "other", "work"];

function highlightMatch(text: string, query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    return <span className="text-muted-foreground">{text}</span>;
  }
  const lower = text.toLowerCase();
  const needle = trimmed.toLowerCase();
  const segments: Array<{ text: string; match: boolean }> = [];
  let cursor = 0;
  while (cursor < text.length) {
    const found = lower.indexOf(needle, cursor);
    if (found === -1) {
      segments.push({ text: text.slice(cursor), match: false });
      break;
    }
    if (found > cursor) {
      segments.push({ text: text.slice(cursor, found), match: false });
    }
    segments.push({
      text: text.slice(found, found + needle.length),
      match: true,
    });
    cursor = found + needle.length;
  }
  return segments.map((segment, index) => (
    <span
      key={index}
      className={
        segment.match ? "font-bold text-foreground" : "text-muted-foreground"
      }
    >
      {segment.text}
    </span>
  ));
}

export function AddressFormDesktop({ lang, dict, apiKey }: IProps) {
  const t = dict.profile.addresses;
  const router = useRouter();
  const params = useSearchParams();

  const initialType = (params.get("type") ?? "home") as
    | "home"
    | "work"
    | "other";

  const [type, setType] = useState<"home" | "work" | "other">(initialType);
  const [name, setName] = useState(params.get("name") ?? "");
  const [address, setAddress] = useState(params.get("address") ?? "");

  const mapRef = useRef<IMapApi | null>(null);
  const [center, setCenter] = useState<ICoords>(DEFAULT_CENTER);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [addressFocused, setAddressFocused] = useState(false);
  const skipNextSuggestRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    reverseGeocode(center.lng, center.lat).then((result) => {
      if (cancelled || !result) return;
      skipNextSuggestRef.current = true;
      setAddress(result.addressLine);
    });
    return () => {
      cancelled = true;
    };
  }, [center.lng, center.lat]);

  useEffect(() => {
    if (skipNextSuggestRef.current) {
      skipNextSuggestRef.current = false;
      setSuggestions([]);
      return;
    }
    if (!address.trim()) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    const handle = setTimeout(() => {
      suggest(address).then((items) => {
        if (!cancelled) setSuggestions(items);
      });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [address]);

  const handleSelectSuggestion = async (item: ISuggestion) => {
    skipNextSuggestRef.current = true;
    setAddress(item.displayName);
    setSuggestions([]);
    setAddressFocused(false);
    const result = await forwardGeocode(item.value);
    if (!result) return;
    mapRef.current?.setCenter({ lng: result.lng, lat: result.lat }, 16);
    skipNextSuggestRef.current = true;
    setAddress(result.addressLine);
  };

  const canSubmit = name.trim() !== "" && address.trim() !== "";

  const handleConfirm = () => {
    if (!canSubmit) return;
    router.push(`/${lang}/profile/addresses`);
  };

  return (
    <div className="grid h-screen grid-cols-[minmax(320px,440px)_1fr] gap-6 p-6">
      <div className="flex flex-col gap-5 overflow-y-auto px-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`/${lang}/profile/addresses`)}
            aria-label="Back"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            {t.selectAddress.title}
          </span>
          <div className="flex items-center gap-3">
            {TYPES.map((option) => (
              <AddressTypeIconButton
                key={option}
                type={option}
                selected={option === type}
                onClick={() => setType(option)}
                ariaLabel={t.types[option]}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="address-name"
            className="text-sm font-medium text-foreground"
          >
            {t.form.addressName}
          </label>
          <input
            id="address-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.form.addressNamePlaceholder}
            className="h-12 w-full rounded-sm bg-secondary px-4 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="address-line"
            className="text-sm font-medium text-foreground"
          >
            {t.form.address}
          </label>
          <input
            id="address-line"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            onFocus={() => setAddressFocused(true)}
            onBlur={() => {
              setTimeout(() => setAddressFocused(false), 150);
            }}
            placeholder={t.form.addressPlaceholder}
            autoComplete="off"
            className="h-12 w-full rounded-sm bg-secondary px-4 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          {addressFocused && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 z-20 mt-2 max-h-80 overflow-y-auto rounded-lg bg-background shadow-[2px_2px_10px_0px_#0000001F]">
              {suggestions.map((item, idx) => (
                <li key={item.value + idx}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelectSuggestion(item)}
                    className="flex w-full items-start gap-2.5 border-b border-border px-4 py-3 text-left last:border-b-0 hover:bg-secondary cursor-pointer"
                  >
                    <span className="flex-1 text-lg font-medium">
                      {highlightMatch(item.displayName, address)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto pt-6">
          <Button
            type="button"
            size="lg"
            onClick={handleConfirm}
            disabled={!canSubmit}
            className="h-12 w-full rounded-sm text-base font-semibold"
          >
            {t.map.confirm}
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-secondary">
        <YandexMap
          ref={mapRef}
          apiKey={apiKey}
          initialCenter={DEFAULT_CENTER}
          initialZoom={15}
          onCenterChange={setCenter}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
        >
          <MapPointSolid className="size-12" />
        </div>

        <div className="absolute right-3 bottom-4 flex flex-col gap-2">
          <div className="flex flex-col rounded-sm bg-background shadow-md">
            <button
              type="button"
              onClick={() => mapRef.current?.zoomIn()}
              aria-label="Zoom in"
              className="grid size-11 place-items-center border-b border-border"
            >
              <Plus className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => mapRef.current?.zoomOut()}
              aria-label="Zoom out"
              className="grid size-11 place-items-center"
            >
              <Minus className="size-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => mapRef.current?.setCenter(DEFAULT_CENTER, 15)}
            aria-label="My location"
            className="grid size-11 place-items-center rounded-sm bg-background text-foreground shadow-md"
          >
            <MapArrowRight className="size-5 -rotate-45" weight="Bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
