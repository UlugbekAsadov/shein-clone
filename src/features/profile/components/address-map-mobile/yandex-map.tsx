"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";

interface ICoords {
  lng: number;
  lat: number;
}

interface IMapApi {
  setCenter: (coords: ICoords, zoom?: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  getCenter: () => ICoords | null;
}

interface YMapV2Instance {
  setCenter: (
    center: [number, number],
    zoom?: number,
    options?: { duration?: number; checkZoomRange?: boolean },
  ) => void;
  getCenter: () => [number, number];
  getZoom: () => number;
  setZoom: (
    zoom: number,
    options?: { duration?: number; checkZoomRange?: boolean },
  ) => void;
  destroy: () => void;
  events: {
    add: (type: string, handler: () => void) => void;
  };
}

interface IProps {
  apiKey: string;
  initialCenter: ICoords;
  initialZoom?: number;
  onCenterChange?: (coords: ICoords) => void;
  ref?: React.Ref<IMapApi | null>;
}

export type { IMapApi, ICoords };

interface YmapsGlobal {
  ready: (cb: () => void) => void;
  Map: new (
    el: HTMLElement | string,
    state: {
      center: [number, number];
      zoom: number;
      controls?: string[];
    },
    options?: { suppressMapOpenBlock?: boolean },
  ) => YMapV2Instance;
  geocode?: (
    query: string | [number, number],
    options?: { results?: number; kind?: string },
  ) => Promise<{
    geoObjects: {
      get: (index: number) => {
        getAddressLine: () => string;
        geometry: { getCoordinates: () => [number, number] };
      } | null;
    };
  }>;
  suggest?: (
    query: string,
    options?: { results?: number },
  ) => Promise<Array<{ value: string; displayName: string }>>;
}

declare global {
  interface Window {
    ymaps?: YmapsGlobal;
    __ymapsLoadingPromise?: Promise<void>;
  }
}

function loadScript(apiKey: string, lang: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.ymaps) {
    return new Promise<void>((resolve) => window.ymaps!.ready(() => resolve()));
  }
  if (window.__ymapsLoadingPromise) return window.__ymapsLoadingPromise;

  window.__ymapsLoadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.com/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=${lang}`;
    script.async = true;
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => resolve());
      } else {
        reject(new Error("ymaps global missing after load"));
      }
    };
    script.onerror = () =>
      reject(new Error("Failed to load Yandex Maps script"));
    document.head.appendChild(script);
  });

  return window.__ymapsLoadingPromise;
}

export function YandexMap({
  apiKey,
  initialCenter,
  initialZoom = 14,
  onCenterChange,
  ref,
}: IProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<YMapV2Instance | null>(null);
  const callback = useRef(onCenterChange);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    callback.current = onCenterChange;
  }, [onCenterChange]);

  useImperativeHandle(
    ref,
    () =>
      ({
        setCenter: (coords, zoom) => {
          mapRef.current?.setCenter([coords.lat, coords.lng], zoom, {
            duration: 300,
          });
        },
        zoomIn: () => {
          const map = mapRef.current;
          if (!map) return;
          map.setZoom(map.getZoom() + 1, { duration: 200 });
        },
        zoomOut: () => {
          const map = mapRef.current;
          if (!map) return;
          map.setZoom(Math.max(0, map.getZoom() - 1), { duration: 200 });
        },
        getCenter: () => {
          const c = mapRef.current?.getCenter();
          if (!c) return null;
          return { lat: c[0], lng: c[1] };
        },
      }) satisfies IMapApi,
    [],
  );

  useEffect(() => {
    let isActive = true;

    const init = async () => {
      if (!apiKey) {
        setError("Yandex API key is missing");
        return;
      }
      try {
        await loadScript(apiKey, "en_US");
      } catch (e) {
        if (isActive) setError((e as Error).message);
        return;
      }
      if (!isActive) return;

      const container = containerRef.current;
      if (!container) return;
      if (!window.ymaps) {
        setError("ymaps not available after script load");
        return;
      }

      const map = new window.ymaps.Map(
        container,
        {
          center: [initialCenter.lat, initialCenter.lng],
          zoom: initialZoom,
          controls: [],
        },
        { suppressMapOpenBlock: true },
      );

      mapRef.current = map;

      map.events.add("actionend", () => {
        const [lat, lng] = map.getCenter();
        callback.current?.({ lat, lng });
      });
    };

    init().catch((e) => {
      if (isActive) setError((e as Error).message);
    });

    return () => {
      isActive = false;
      try {
        mapRef.current?.destroy();
      } catch {
        // ignore destroy errors on unmount
      }
      mapRef.current = null;
    };
  }, [apiKey, initialCenter.lat, initialCenter.lng, initialZoom]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      {error && (
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-destructive/10 p-4 text-center text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
