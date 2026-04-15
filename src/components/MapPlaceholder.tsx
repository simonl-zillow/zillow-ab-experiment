"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";

interface MapPin {
  lat: number;
  lng: number;
  price: string;
}

// Real Seattle property locations with prices
const mapPins: MapPin[] = [
  { lat: 47.6145, lng: -122.3185, price: "$1.2M" },
  { lat: 47.6280, lng: -122.3540, price: "$850K" },
  { lat: 47.6060, lng: -122.3320, price: "$599K" },
  { lat: 47.6350, lng: -122.2820, price: "$1.5M" },
  { lat: 47.6530, lng: -122.3470, price: "$475K" },
  { lat: 47.5920, lng: -122.2870, price: "$835K" },
  { lat: 47.6680, lng: -122.3840, price: "$745K" },
  { lat: 47.6190, lng: -122.3620, price: "$309K" },
  { lat: 47.6420, lng: -122.3250, price: "$1.1M" },
  { lat: 47.5810, lng: -122.3870, price: "$899K" },
  { lat: 47.6750, lng: -122.3130, price: "$3.5M" },
  { lat: 47.6580, lng: -122.3050, price: "$1.3M" },
  { lat: 47.6040, lng: -122.3730, price: "$525K" },
  { lat: 47.6890, lng: -122.3260, price: "$950K" },
  { lat: 47.5720, lng: -122.3550, price: "$18.7M" },
  { lat: 47.6480, lng: -122.3950, price: "$650K" },
  { lat: 47.5960, lng: -122.3150, price: "$420K" },
  { lat: 47.6310, lng: -122.3690, price: "$780K" },
  { lat: 47.6710, lng: -122.3370, price: "$1.6M" },
  { lat: 47.6550, lng: -122.3580, price: "$690K" },
  { lat: 47.5850, lng: -122.3420, price: "$1.4M" },
  { lat: 47.6620, lng: -122.2980, price: "$570K" },
  { lat: 47.6100, lng: -122.2900, price: "$2.1M" },
  { lat: 47.6400, lng: -122.3780, price: "$810K" },
];

export function MapPlaceholder() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      // Create map centered on Seattle
      const map = L.map(mapRef.current, {
        center: [47.6280, -122.3420],
        zoom: 12,
        zoomControl: false,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Use CartoDB Positron for a clean, Zillow-like look
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: 'Map data &copy;2026 Google',
          maxZoom: 19,
        }
      ).addTo(map);

      // Add zoom control on the right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Create price marker icons
      mapPins.forEach((pin) => {
        const icon = L.divIcon({
          className: "zillow-price-marker",
          html: `<div class="zillow-pin"><span class="zillow-pin-dot"></span>${pin.price}</div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        L.marker([pin.lat, pin.lng], { icon }).addTo(map);
      });

      setLoaded(true);
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Leaflet CSS injected inline to avoid import issues */}
      <style>{`
        @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");

        .zillow-price-marker {
          background: none !important;
          border: none !important;
        }

        .zillow-pin {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 3px 7px;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-inter), Inter, system-ui, sans-serif;
          color: #2A2A33;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: all 0.15s ease;
        }

        .zillow-pin:hover {
          background: #2A2A33;
          color: #fff;
          border-color: #2A2A33;
          z-index: 1000 !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }

        .zillow-pin:hover .zillow-pin-dot {
          background: #fff;
        }

        .zillow-pin-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8B1A1A;
          flex-shrink: 0;
        }

        /* Hide default Leaflet attribution styling to match Zillow */
        .leaflet-control-attribution {
          font-size: 10px !important;
          background: rgba(255,255,255,0.7) !important;
          padding: 2px 6px !important;
        }

        .leaflet-control-zoom a {
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 18px !important;
          color: #585863 !important;
          border-color: #E0E0E6 !important;
        }

        .leaflet-control-zoom {
          border: 1px solid #E0E0E6 !important;
          border-radius: 6px !important;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }
      `}</style>

      {/* Map container */}
      <div ref={mapRef} className="h-full w-full" />

      {/* Homes count badge - overlay */}
      <div className="absolute top-3 left-3 z-[1000] rounded-md bg-white px-3 py-1.5 text-[13px] font-semibold text-[#2A2A33] shadow-md">
        502 of 4,163 homes
      </div>

      {/* Schools + Draw buttons */}
      <div className="absolute top-3 left-[200px] z-[1000] flex items-center gap-2">
        <button
          type="button"
          className="rounded-full border border-[#CCCCCC] bg-white px-3 py-1 text-[12px] font-semibold text-[#2A2A33] shadow-sm hover:bg-[#F7F7F9]"
        >
          Schools <span className="text-[#585863]">▾</span>
        </button>
        <button
          type="button"
          className="rounded-full border border-[#CCCCCC] bg-white px-3 py-1 text-[12px] font-semibold text-[#2A2A33] shadow-sm hover:bg-[#F7F7F9]"
        >
          Draw
        </button>
      </div>

      {/* Map type toggle */}
      <div className="absolute bottom-8 left-3 z-[1000] rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold text-[#2A2A33] shadow-md cursor-pointer hover:bg-[#F7F7F9]">
        Map ▾
      </div>

      {/* Loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 z-[999] flex items-center justify-center bg-[#E5E3DF]">
          <div className="text-sm text-[#585863]">Loading map…</div>
        </div>
      )}
    </div>
  );
}
