"use client";

import { useState } from "react";

export function AreaNarrativeBanner({ location, narrative }: { location: string; narrative: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="relative mx-4 mb-4 rounded-r-lg border-l-[3px] border-l-[#006AFF] bg-[#FAFAF5] px-5 py-4">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-[#767680]">
        About {location}
      </p>

      <p
        className="text-[13px] leading-[1.6] text-[#585863]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {narrative}
      </p>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full text-[#999] transition-colors hover:bg-[#F0F0F5] hover:text-[#585863]"
      >
        &#10005;
      </button>
    </div>
  );
}
