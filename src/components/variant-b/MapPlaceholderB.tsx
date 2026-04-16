"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Map as LeafletMap } from "leaflet";
import { MapTooltipB } from "./MapTooltipB";

interface MapPin {
  lat: number;
  lng: number;
  price: string;
  address: string;
  neighborhood: string;
  imageUrl: string;
  beds: number;
  baths: number;
  sqft: string;
}

const areaCharacters: Record<string, string> = {
  "Capitol Hill":
    "This part of Capitol Hill is walkable and vibrant — most residents are young professionals who grab coffee on Broadway and catch live music on weekends.",
  "Ballard":
    "This part of Ballard is walkable and calm — most residents are young professionals who bike to work and grab dinner on Market Street.",
  "University District":
    "The U-District buzzes with student energy — affordable eats, bookshops, and easy light rail access to downtown.",
  "Queen Anne":
    "Upper Queen Anne is serene with panoramic views — families stroll to local bakeries while enjoying quiet residential streets.",
  "Downtown":
    "Dense urban living at its best — everything is walkable and the light rail connects you to the airport in 40 minutes.",
  "Fremont":
    "The self-proclaimed 'Center of the Universe' — quirky public art, Sunday markets, and a tight-knit creative community.",
  "West Seattle":
    "A beach-town vibe within city limits — Alki sunsets, local surf shops, and neighbors who actually know each other.",
  "Magnolia":
    "Tucked away and peaceful — Discovery Park trails, waterfront views, and a village feel despite being minutes from downtown.",
};

const IMG1 = "https://photos.zillowstatic.com/fp/0909f981c6f756b3365ea2111c9209fe-p_e.webp";
const IMG2 = "https://photos.zillowstatic.com/fp/a0279b0a811ac57b50a78fd6659bacc9-p_e.webp";
const IMG3 = "https://photos.zillowstatic.com/fp/2a306b6d91d93a8254132f4fd3e0d7f9-p_e.webp";

const mapPins: MapPin[] = [
  { lat: 47.6145, lng: -122.3185, price: "$1,199,000", address: "328 26th Ave, Seattle, WA", neighborhood: "Capitol Hill", imageUrl: IMG1, beds: 5, baths: 2, sqft: "2,680" },
  { lat: 47.6280, lng: -122.3540, price: "$850,000", address: "132 NW 143rd St, Seattle, WA", neighborhood: "Queen Anne", imageUrl: IMG2, beds: 4, baths: 2, sqft: "2,070" },
  { lat: 47.6060, lng: -122.3320, price: "$599,000", address: "1420 Terry Ave #2104, Seattle", neighborhood: "Downtown", imageUrl: IMG3, beds: 1, baths: 1, sqft: "740" },
  { lat: 47.6350, lng: -122.2820, price: "$1,199,000", address: "7341 B 21st Ave NE, Seattle", neighborhood: "University District", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,961" },
  { lat: 47.6530, lng: -122.3470, price: "$475,000", address: "5711 Phinney Ave N, Seattle", neighborhood: "Fremont", imageUrl: IMG2, beds: 2, baths: 1, sqft: "867" },
  { lat: 47.5920, lng: -122.2870, price: "$835,000", address: "3321 35th Ave S, Seattle, WA", neighborhood: "Capitol Hill", imageUrl: IMG3, beds: 3, baths: 1, sqft: "960" },
  { lat: 47.6680, lng: -122.3840, price: "$745,000", address: "6318 41st Ave SW #D, Seattle", neighborhood: "Ballard", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,444" },
  { lat: 47.6190, lng: -122.3620, price: "$309,000", address: "4222 Beach Dr SW, Seattle, WA", neighborhood: "West Seattle", imageUrl: IMG2, beds: 2, baths: 2, sqft: "970" },
  { lat: 47.6420, lng: -122.3250, price: "$1,525,000", address: "928 34th Ave, Seattle, WA", neighborhood: "Capitol Hill", imageUrl: IMG3, beds: 3, baths: 3, sqft: "2,017" },
  { lat: 47.5810, lng: -122.3870, price: "$899,950", address: "2644 34th Ave W, Seattle, WA", neighborhood: "West Seattle", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,083" },
  { lat: 47.6750, lng: -122.3130, price: "$18,750,000", address: "3038 E Laurelhurst Dr NE", neighborhood: "University District", imageUrl: IMG2, beds: 6, baths: 10, sqft: "11,271" },
  { lat: 47.6580, lng: -122.3050, price: "$1,575,000", address: "2200 41st Ave SW, Seattle", neighborhood: "Ballard", imageUrl: IMG3, beds: 4, baths: 3, sqft: "2,420" },
  { lat: 47.6040, lng: -122.3730, price: "$525,000", address: "4222 Beach Dr SW #202", neighborhood: "West Seattle", imageUrl: IMG1, beds: 2, baths: 2, sqft: "970" },
  { lat: 47.6890, lng: -122.3260, price: "$950,000", address: "132 NW 143rd St, Seattle", neighborhood: "Magnolia", imageUrl: IMG2, beds: 4, baths: 2, sqft: "2,070" },
  { lat: 47.5720, lng: -122.3550, price: "$1,400,000", address: "2200 41st Ave SW, Seattle", neighborhood: "West Seattle", imageUrl: IMG3, beds: 4, baths: 3, sqft: "2,420" },
  { lat: 47.6480, lng: -122.3950, price: "$650,000", address: "6318 41st Ave SW, Seattle", neighborhood: "Magnolia", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,444" },
  { lat: 47.5960, lng: -122.3150, price: "$420,000", address: "1420 Terry Ave, Seattle, WA", neighborhood: "Downtown", imageUrl: IMG2, beds: 1, baths: 1, sqft: "740" },
  { lat: 47.6310, lng: -122.3690, price: "$780,000", address: "2644 34th Ave W, Seattle", neighborhood: "Queen Anne", imageUrl: IMG3, beds: 3, baths: 3, sqft: "1,083" },
  { lat: 47.6710, lng: -122.3370, price: "$1,600,000", address: "928 34th Ave, Seattle, WA", neighborhood: "Ballard", imageUrl: IMG1, beds: 3, baths: 3, sqft: "2,017" },
  { lat: 47.6550, lng: -122.3580, price: "$690,000", address: "5711 Phinney Ave N, Seattle", neighborhood: "Fremont", imageUrl: IMG2, beds: 2, baths: 1, sqft: "867" },
  { lat: 47.5850, lng: -122.3420, price: "$1,400,000", address: "2200 41st Ave SW, Seattle", neighborhood: "West Seattle", imageUrl: IMG3, beds: 4, baths: 3, sqft: "2,420" },
  { lat: 47.6620, lng: -122.2980, price: "$570,000", address: "7341 21st Ave NE, Seattle", neighborhood: "University District", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,961" },
  { lat: 47.6100, lng: -122.2900, price: "$2,100,000", address: "3038 Laurelhurst Dr NE", neighborhood: "Capitol Hill", imageUrl: IMG2, beds: 6, baths: 10, sqft: "11,271" },
  { lat: 47.6400, lng: -122.3780, price: "$810,000", address: "132 Queen Anne Ave, Seattle", neighborhood: "Queen Anne", imageUrl: IMG3, beds: 3, baths: 2, sqft: "1,444" },
];

interface TooltipState {
  imageUrl: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  address: string;
  neighborhood: string;
  areaCharacter: string;
  position: { x: number; y: number };
}

export function MapPlaceholderB() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleCloseTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [47.6280, -122.3420],
        zoom: 12,
        zoomControl: false,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "Map data &copy;2026 Google",
          maxZoom: 19,
        }
      ).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      mapPins.forEach((pin) => {
        const shortPrice = pin.price
          .replace(/,000,000$/, "M")
          .replace(/,000$/, "K")
          .replace(/(\d),(\d{3}),(\d{3})/, "$1.$2M");

        const icon = L.divIcon({
          className: "zillow-price-marker",
          html: `<div class="zillow-pin"><span class="zillow-pin-dot"></span>${shortPrice}</div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

        marker.on("click", (e) => {
          const containerPoint = map.latLngToContainerPoint(e.latlng);
          const mapContainer = mapRef.current;
          if (!mapContainer) return;

          const rect = mapContainer.getBoundingClientRect();
          const character =
            areaCharacters[pin.neighborhood] ||
            "A welcoming Seattle neighborhood with its own unique character and local charm.";

          const tooltipWidth = 270;
          const tooltipHeight = 360;
          let x = rect.left + containerPoint.x + 14;
          let y = rect.top + containerPoint.y - tooltipHeight / 2;

          if (x + tooltipWidth > window.innerWidth) {
            x = rect.left + containerPoint.x - tooltipWidth - 14;
          }
          if (y < 60) y = 60;
          if (y + tooltipHeight > window.innerHeight) {
            y = window.innerHeight - tooltipHeight - 10;
          }

          setTooltip({
            imageUrl: pin.imageUrl,
            price: pin.price,
            beds: pin.beds,
            baths: pin.baths,
            sqft: pin.sqft,
            address: pin.address,
            neighborhood: pin.neighborhood,
            areaCharacter: character,
            position: { x, y },
          });
        });
      });

      map.on("click", () => {
        setTooltip(null);
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

      <div ref={mapRef} className="h-full w-full" />

      <div className="absolute top-3 left-3 z-[1000] rounded-md bg-white px-3 py-1.5 text-[13px] font-semibold text-[#2A2A33] shadow-md">
        502 of 4,163 homes
      </div>

      <div className="absolute top-3 left-[200px] z-[1000] flex items-center gap-2">
        <button type="button" className="rounded-full border border-[#CCCCCC] bg-white px-3 py-1 text-[12px] font-semibold text-[#2A2A33] shadow-sm hover:bg-[#F7F7F9]">
          Schools <span className="text-[#585863]">▾</span>
        </button>
        <button type="button" className="rounded-full border border-[#CCCCCC] bg-white px-3 py-1 text-[12px] font-semibold text-[#2A2A33] shadow-sm hover:bg-[#F7F7F9]">
          Draw
        </button>
      </div>

      <div className="absolute bottom-8 left-3 z-[1000] rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold text-[#2A2A33] shadow-md cursor-pointer hover:bg-[#F7F7F9]">
        Map ▾
      </div>

      {!loaded && (
        <div className="absolute inset-0 z-[999] flex items-center justify-center bg-[#E5E3DF]">
          <div className="text-sm text-[#585863]">Loading map…</div>
        </div>
      )}

      {tooltip && (
        <MapTooltipB
          imageUrl={tooltip.imageUrl}
          price={tooltip.price}
          beds={tooltip.beds}
          baths={tooltip.baths}
          sqft={tooltip.sqft}
          address={tooltip.address}
          neighborhood={tooltip.neighborhood}
          areaCharacter={tooltip.areaCharacter}
          position={tooltip.position}
          onClose={handleCloseTooltip}
        />
      )}
    </div>
  );
}
