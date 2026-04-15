"use client";

export function MapTooltipB({
  price,
  address,
  areaCharacter,
  position,
  onClose,
}: {
  price: string;
  address: string;
  areaCharacter: string;
  position: { x: number; y: number };
  onClose: () => void;
}) {
  return (
    <div
      className="fixed z-[9999] max-w-[280px] rounded-lg border border-[#E0E0E6] bg-white p-3 shadow-lg"
      style={{ left: position.x, top: position.y }}
    >
      <div>
        <p className="text-[16px] font-bold text-[#2A2A33]">{price}</p>
        <p className="text-[13px] text-[#585863]">{address}</p>
      </div>

      <div className="my-2 border-t border-[#E0E0E6]" />

      <div className="rounded-lg bg-[#F0F4F8] p-2.5">
        <p className="text-[12px] leading-[1.5] text-[#585863]">
          {areaCharacter}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close tooltip"
        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full text-[11px] text-[#999] transition-colors hover:bg-[#F0F0F5] hover:text-[#585863]"
      >
        &#10005;
      </button>
    </div>
  );
}
