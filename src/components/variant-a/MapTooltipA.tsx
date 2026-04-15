"use client";

interface MapTooltipAProps {
  price: string;
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

export function MapTooltipA({ price, address, lifestyle, position, onClose }: MapTooltipAProps) {
  return (
    <div
      className="fixed z-[9999] max-w-[260px] rounded-lg border border-[#E0E0E6] bg-white p-3 shadow-lg"
      style={{ left: position.x, top: position.y }}
    >
      <button type="button" onClick={onClose} aria-label="Close tooltip" className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full text-[#999] hover:bg-[#F0F0F5] hover:text-[#585863]">
        &#10005;
      </button>

      <p className="text-base font-bold text-[#2A2A33]">{price}</p>
      <p className="text-[13px] text-[#585863]">{address}</p>

      <div className="my-2 border-t border-[#E0E0E6]" />

      <div className="flex items-center justify-between py-1 text-[13px]">
        <span className="text-[#585863]">Commute</span>
        <span className="font-semibold text-[#2A2A33]">{lifestyle.commuteTime}</span>
      </div>
      <div className="flex items-center justify-between py-1 text-[13px]">
        <span className="text-[#585863]">Walkability</span>
        <span className="font-semibold text-[#2A2A33]">{getWalkabilityLabel(lifestyle.walkScore)}</span>
      </div>
      <div className="flex items-center justify-between py-1 text-[13px]">
        <span className="text-[#585863]">Nearby</span>
        <span className="font-semibold text-[#2A2A33]">{lifestyle.nearbyAmenity}</span>
      </div>
    </div>
  );
}
