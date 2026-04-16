"use client";

interface MapTooltipAProps {
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
  onClose: () => void;
}

function getWalkabilityLabel(score: number): string {
  if (score >= 70) return "Very Walkable";
  if (score >= 50) return "Somewhat Walkable";
  return "Car-Dependent";
}

export function MapTooltipA({
  imageUrl,
  price,
  beds,
  baths,
  sqft,
  address,
  lifestyle,
  position,
  onClose,
}: MapTooltipAProps) {
  return (
    <div
      className="fixed z-[9999] w-[260px] overflow-hidden rounded-lg border border-[#E0E0E6] bg-white shadow-lg"
      style={{ left: position.x, top: position.y }}
    >
      {/* Property image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={address}
          className="size-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <p className="text-[15px] font-bold text-[#2A2A33]">{price}</p>

        {/* Stats */}
        <p className="text-[12px] text-[#2A2A33]">
          <span className="font-semibold">{beds}</span>
          <span className="text-[#585863]"> bds</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="font-semibold">{baths}</span>
          <span className="text-[#585863]"> ba</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="font-semibold">{sqft}</span>
          <span className="text-[#585863]"> sqft</span>
        </p>

        {/* Address */}
        <p className="mt-0.5 truncate text-[12px] text-[#585863]">{address}</p>

        {/* Divider */}
        <div className="my-2 border-t border-[#E0E0E6]" />

        {/* Lifestyle rows */}
        <div className="flex items-center justify-between py-0.5 text-[12px]">
          <span className="text-[#585863]">🚗 Commute</span>
          <span className="font-semibold text-[#2A2A33]">{lifestyle.commuteTime}</span>
        </div>
        <div className="flex items-center justify-between py-0.5 text-[12px]">
          <span className="text-[#585863]">🚶 Walkability</span>
          <span className="font-semibold text-[#2A2A33]">{getWalkabilityLabel(lifestyle.walkScore)}</span>
        </div>
        <div className="flex items-center justify-between py-0.5 text-[12px]">
          <span className="text-[#585863]">📍 Nearby</span>
          <span className="font-semibold text-[#2A2A33]">{lifestyle.nearbyAmenity}</span>
        </div>
      </div>
    </div>
  );
}
