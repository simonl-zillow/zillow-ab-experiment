"use client";

export function MapTooltipB({
  imageUrl,
  price,
  beds,
  baths,
  sqft,
  address,
  neighborhood,
  areaCharacter,
  position,
  onClose,
}: {
  imageUrl: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  address: string;
  neighborhood: string;
  areaCharacter: string;
  position: { x: number; y: number };
  onClose: () => void;
}) {
  return (
    <div
      className="fixed z-[9999] w-[270px] overflow-hidden rounded-lg border border-[#E0E0E6] bg-white shadow-lg"
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

        {/* Area Character section with dynamic header */}
        <div className="rounded-lg bg-[#F0F4F8] p-2.5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-[#585863]">
            About {neighborhood}
          </p>
          <p
            className="text-[11px] leading-[1.5] text-[#585863]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {areaCharacter}
          </p>
        </div>
      </div>
    </div>
  );
}
