"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Map as LeafletMap } from "leaflet";
import { MapTooltipA } from "./MapTooltipA";

interface MapPin {
  lat: number;
  lng: number;
  price: string;
  address: string;
  imageUrl: string;
  beds: number;
  baths: number;
  sqft: string;
  commuteTime: string;
  walkScore: number;
  nearbyAmenity: string;
}

const IMG1 = "https://photos.zillowstatic.com/fp/0909f981c6f756b3365ea2111c9209fe-p_e.webp";
const IMG2 = "https://photos.zillowstatic.com/fp/a0279b0a811ac57b50a78fd6659bacc9-p_e.webp";
const IMG3 = "https://photos.zillowstatic.com/fp/2a306b6d91d93a8254132f4fd3e0d7f9-p_e.webp";

const mapPins: MapPin[] = [
  { lat: 47.6145, lng: -122.3185, price: "$1,199,000", address: "328 26th Ave, Seattle, WA", imageUrl: IMG1, beds: 5, baths: 2, sqft: "2,680", commuteTime: "12 min by car", walkScore: 85, nearbyAmenity: "Whole Foods, Cal Anderson Park" },
  { lat: 47.6280, lng: -122.3540, price: "$850,000", address: "132 NW 143rd St, Seattle, WA", imageUrl: IMG2, beds: 4, baths: 2, sqft: "2,070", commuteTime: "22 min by car", walkScore: 62, nearbyAmenity: "QFC, Carkeek Park" },
  { lat: 47.6060, lng: -122.3320, price: "$599,000", address: "1420 Terry Ave #2104, Seattle", imageUrl: IMG3, beds: 1, baths: 1, sqft: "740", commuteTime: "5 min by car", walkScore: 96, nearbyAmenity: "Trader Joe's, Pike Place" },
  { lat: 47.6350, lng: -122.2820, price: "$1,199,000", address: "7341 B 21st Ave NE, Seattle", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,961", commuteTime: "18 min by car", walkScore: 78, nearbyAmenity: "PCC, U Village" },
  { lat: 47.6530, lng: -122.3470, price: "$475,000", address: "5711 Phinney Ave N, Seattle", imageUrl: IMG2, beds: 2, baths: 1, sqft: "867", commuteTime: "17 min by car", walkScore: 82, nearbyAmenity: "Fred Meyer, Green Lake" },
  { lat: 47.5920, lng: -122.2870, price: "$835,000", address: "3321 35th Ave S, Seattle, WA", imageUrl: IMG3, beds: 3, baths: 1, sqft: "960", commuteTime: "15 min by car", walkScore: 74, nearbyAmenity: "Safeway, Genesee Park" },
  { lat: 47.6680, lng: -122.3840, price: "$745,000", address: "6318 41st Ave SW #D, Seattle", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,444", commuteTime: "20 min by car", walkScore: 68, nearbyAmenity: "Ballard Market, Golden Gardens" },
  { lat: 47.6190, lng: -122.3620, price: "$309,000", address: "4222 Beach Dr SW, Seattle, WA", imageUrl: IMG2, beds: 2, baths: 2, sqft: "970", commuteTime: "25 min by car", walkScore: 55, nearbyAmenity: "Thriftway, Alki Beach" },
  { lat: 47.6420, lng: -122.3250, price: "$1,525,000", address: "928 34th Ave, Seattle, WA", imageUrl: IMG3, beds: 3, baths: 3, sqft: "2,017", commuteTime: "10 min by car", walkScore: 89, nearbyAmenity: "PCC, Volunteer Park" },
  { lat: 47.5810, lng: -122.3870, price: "$899,950", address: "2644 34th Ave W, Seattle, WA", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,083", commuteTime: "14 min by car", walkScore: 81, nearbyAmenity: "Metropolitan Market, Discovery Park" },
  { lat: 47.6750, lng: -122.3130, price: "$18,750,000", address: "3038 E Laurelhurst Dr NE", imageUrl: IMG2, beds: 6, baths: 10, sqft: "11,271", commuteTime: "16 min by car", walkScore: 45, nearbyAmenity: "QFC, Laurelhurst Beach" },
  { lat: 47.6580, lng: -122.3050, price: "$1,575,000", address: "2200 41st Ave SW, Seattle", imageUrl: IMG3, beds: 4, baths: 3, sqft: "2,420", commuteTime: "19 min by car", walkScore: 72, nearbyAmenity: "Safeway, Salmon Bay Park" },
  { lat: 47.6040, lng: -122.3730, price: "$525,000", address: "4222 Beach Dr SW #202", imageUrl: IMG1, beds: 2, baths: 2, sqft: "970", commuteTime: "25 min by car", walkScore: 55, nearbyAmenity: "Thriftway, Alki Beach" },
  { lat: 47.6890, lng: -122.3260, price: "$950,000", address: "132 NW 143rd St, Seattle", imageUrl: IMG2, beds: 4, baths: 2, sqft: "2,070", commuteTime: "28 min by car", walkScore: 48, nearbyAmenity: "Safeway, Carkeek Park" },
  { lat: 47.5720, lng: -122.3550, price: "$1,400,000", address: "2200 41st Ave SW, Seattle", imageUrl: IMG3, beds: 4, baths: 3, sqft: "2,420", commuteTime: "20 min by car", walkScore: 52, nearbyAmenity: "Thriftway, Lincoln Park" },
  { lat: 47.6480, lng: -122.3950, price: "$650,000", address: "6318 41st Ave SW, Seattle", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,444", commuteTime: "24 min by car", walkScore: 58, nearbyAmenity: "Safeway, Discovery Park" },
  { lat: 47.5960, lng: -122.3150, price: "$420,000", address: "1420 Terry Ave, Seattle, WA", imageUrl: IMG2, beds: 1, baths: 1, sqft: "740", commuteTime: "5 min by car", walkScore: 96, nearbyAmenity: "Whole Foods, Denny Park" },
  { lat: 47.6310, lng: -122.3690, price: "$780,000", address: "2644 34th Ave W, Seattle", imageUrl: IMG3, beds: 3, baths: 3, sqft: "1,083", commuteTime: "14 min by car", walkScore: 81, nearbyAmenity: "QFC, Kerry Park" },
  { lat: 47.6710, lng: -122.3370, price: "$1,600,000", address: "928 34th Ave, Seattle, WA", imageUrl: IMG1, beds: 3, baths: 3, sqft: "2,017", commuteTime: "20 min by car", walkScore: 76, nearbyAmenity: "Ballard Market, Golden Gardens" },
  { lat: 47.6550, lng: -122.3580, price: "$690,000", address: "5711 Phinney Ave N, Seattle", imageUrl: IMG2, beds: 2, baths: 1, sqft: "867", commuteTime: "17 min by car", walkScore: 82, nearbyAmenity: "PCC, Woodland Park" },
  { lat: 47.5850, lng: -122.3420, price: "$1,400,000", address: "2200 41st Ave SW, Seattle", imageUrl: IMG3, beds: 4, baths: 3, sqft: "2,420", commuteTime: "22 min by car", walkScore: 60, nearbyAmenity: "Trader Joe's, Lincoln Park" },
  { lat: 47.6620, lng: -122.2980, price: "$570,000", address: "7341 21st Ave NE, Seattle", imageUrl: IMG1, beds: 3, baths: 3, sqft: "1,961", commuteTime: "18 min by car", walkScore: 78, nearbyAmenity: "QFC, Ravenna Park" },
  { lat: 47.6100, lng: -122.2900, price: "$2,100,000", address: "3038 Laurelhurst Dr NE", imageUrl: IMG2, beds: 6, baths: 10, sqft: "11,271", commuteTime: "16 min by car", walkScore: 45, nearbyAmenity: "QFC, Laurelhurst Beach" },
  { lat: 47.6400, lng: -122.3780, price: "$810,000", address: "132 Queen Anne Ave, Seattle", imageUrl: IMG3, beds: 3, baths: 2, sqft: "1,444", commuteTime: "12 min by car", walkScore: 84, nearbyAmenity: "Metropolitan Market, Kerry Park" },
];

interface TooltipState {
  imageUrl: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  address: string;
  lifestyle: {
    commuteTime: string;
    walkScore: number;
    nearbyAmenity: string;
  };
  position: { x: number; y: number };
}

export function MapPlaceholderA() {
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
        const icon = L.divIcon({
          className: "zillow-price-marker",
          html: `<div class="zillow-pin"><span class="zillow-pin-dot"></span>${pin.price.replace(/,\d{3}$/, "K").replace(/,000,000$/, "M").replace(/(\d),(\d{3}),(\d{3})$/, "$1.$2M")}</div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

        // Hover → show lifestyle tooltip with image
        marker.on("mouseover", (e) => {
          const containerPoint = map.latLngToContainerPoint(e.latlng);
          const mapContainer = mapRef.current;
          if (!mapContainer) return;

          const rect = mapContainer.getBoundingClientRect();

          // Position tooltip so it doesn't overflow the viewport
          const tooltipWidth = 260;
          const tooltipHeight = 320;
          let x = rect.left + containerPoint.x + 14;
          let y = rect.top + containerPoint.y - tooltipHeight / 2;

          // Keep within screen bounds
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
            lifestyle: {
              commuteTime: pin.commuteTime,
              walkScore: pin.walkScore,
              nearbyAmenity: pin.nearbyAmenity,
            },
            position: { x, y },
          });
        });

        marker.on("mouseout", () => {
          setTooltip(null);
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
        <MapTooltipA
          imageUrl={tooltip.imageUrl}
          price={tooltip.price}
          beds={tooltip.beds}
          baths={tooltip.baths}
          sqft={tooltip.sqft}
          address={tooltip.address}
          lifestyle={tooltip.lifestyle}
          position={tooltip.position}
          onClose={handleCloseTooltip}
        />
      )}
    </div>
  );
}
