"use client";

import { cn } from "@/lib/utils";
import { SearchIcon, ChevronDownIcon, HeartIcon } from "@/components/icons";

const filterPills = [
  { label: "For sale", isActive: true, hasChevron: true },
  { label: "Price", isActive: false, hasChevron: true },
  { label: "Beds & baths", isActive: false, hasChevron: true },
  { label: "Property type", isActive: false, hasChevron: true },
  { label: "More filters", isActive: false, hasChevron: true },
] as const;

export function SearchFilterBar() {
  return (
    <div className="sticky top-[52px] z-40 border-b border-[#E0E0E6] bg-white">
      <div className="flex items-center gap-2 px-4 py-2">
        {/* Search Input */}
        <div className="relative w-full max-w-[280px] shrink-0">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#585863]" />
          <input
            type="text"
            placeholder="Address, neighborhood, city, ZIP"
            className="h-[36px] w-full rounded-lg border border-[#E0E0E6] bg-white pl-9 pr-3 text-[13px] outline-none transition-colors placeholder:text-[#767680] focus:border-[#006AFF]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {filterPills.map((pill) => (
            <button
              key={pill.label}
              type="button"
              className={cn(
                "flex h-[36px] shrink-0 cursor-pointer items-center gap-1 rounded-full border px-3.5 text-[13px] font-semibold transition-colors",
                pill.isActive
                  ? "border-[#1A1A2E] bg-[#1A1A2E] text-white"
                  : "border-[#CCCCCC] bg-white text-[#2A2A33] hover:bg-[#F7F7F9]"
              )}
            >
              <span>{pill.label}</span>
              {pill.hasChevron && (
                <ChevronDownIcon
                  className={cn(
                    "h-3.5 w-3.5",
                    pill.isActive ? "text-white" : "text-[#585863]"
                  )}
                />
              )}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Save search */}
        <button
          type="button"
          className="flex h-[36px] shrink-0 items-center gap-1.5 rounded-lg bg-[#006AFF] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#0052CC]"
        >
          Save search
        </button>

        {/* Saved count */}
        <button
          type="button"
          className="flex h-[36px] shrink-0 items-center gap-1 rounded-lg border border-[#E0E0E6] px-3 text-[13px] text-[#585863] transition-colors hover:bg-[#F7F7F9]"
        >
          <HeartIcon className="h-4 w-4" />
          <span>41</span>
        </button>
      </div>
    </div>
  );
}
