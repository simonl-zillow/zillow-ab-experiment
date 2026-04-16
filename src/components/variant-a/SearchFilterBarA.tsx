"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon, ChevronDownIcon, HeartIcon } from "@/components/icons";

const filterPills = [
  { label: "For sale", isActive: true, hasChevron: true },
  { label: "Price", isActive: false, hasChevron: true },
  { label: "Beds & baths", isActive: false, hasChevron: true },
  { label: "Property type", isActive: false, hasChevron: true },
  { label: "More filters", isActive: false, hasChevron: true },
] as const;

interface LifestyleFilter {
  key: string;
  emoji: string;
  label: string;
}

const lifestyleFilters: LifestyleFilter[] = [
  { key: "walkable", emoji: "\u{1F6B6}", label: "Walkable (70+)" },
  { key: "near-schools", emoji: "\u{1F3EB}", label: "Good Schools Nearby" },
  { key: "near-dining", emoji: "\u{1F37D}\uFE0F", label: "Restaurants & Cafés" },
  { key: "near-parks", emoji: "\u{1F333}", label: "Parks & Outdoors" },
  { key: "quiet", emoji: "\u{1F30C}", label: "Quiet Neighborhood" },
  { key: "nightlife", emoji: "\u{1F378}", label: "Nightlife & Entertainment" },
  { key: "short-commute", emoji: "\u{1F697}", label: "Short Commute (< 15 min)" },
  { key: "near-transit", emoji: "\u{1F687}", label: "Near Public Transit" },
];

export function SearchFilterBarA({
  onFilterChange,
}: {
  onFilterChange?: (filters: Set<string>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleToggle = useCallback(
    (key: string) => {
      setActiveFilters((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        onFilterChange?.(next);
        return next;
      });
    },
    [onFilterChange]
  );

  const handleOpenToggle = useCallback(() => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left });
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [isOpen]);

  const activeCount = activeFilters.size;
  const lifestyleLabel = activeCount > 0 ? `Lifestyle \u00B7 ${activeCount}` : "Lifestyle";

  return (
    <div className="sticky top-[52px] z-40 border-b border-[#E0E0E6] bg-white">
      <div className="flex items-center gap-2 px-4 py-2">
        <div className="relative w-full max-w-[280px] shrink-0">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#585863]" />
          <input type="text" placeholder="Address, neighborhood, city, ZIP" className="h-[36px] w-full rounded-lg border border-[#E0E0E6] bg-white pl-9 pr-3 text-[13px] outline-none transition-colors placeholder:text-[#767680] focus:border-[#006AFF]" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {filterPills.map((pill) => (
            <button key={pill.label} type="button" className={cn("flex h-[36px] shrink-0 cursor-pointer items-center gap-1 rounded-full border px-3.5 text-[13px] font-semibold transition-colors", pill.isActive ? "border-[#1A1A2E] bg-[#1A1A2E] text-white" : "border-[#CCCCCC] bg-white text-[#2A2A33] hover:bg-[#F7F7F9]")}>
              <span>{pill.label}</span>
              {pill.hasChevron && <ChevronDownIcon className={cn("h-3.5 w-3.5", pill.isActive ? "text-white" : "text-[#585863]")} />}
            </button>
          ))}

          {/* Lifestyle filter pill */}
          <button
            ref={buttonRef}
            type="button"
            onClick={handleOpenToggle}
            className={cn(
              "flex h-[36px] shrink-0 cursor-pointer items-center gap-1 rounded-full border px-3.5 text-[13px] font-semibold transition-colors",
              activeCount > 0
                ? "border-[#006AFF] bg-[#EBF4FF] text-[#006AFF]"
                : "border-[#CCCCCC] bg-white text-[#2A2A33] hover:bg-[#F7F7F9]"
            )}
          >
            <span>{lifestyleLabel}</span>
            <ChevronDownIcon className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180", activeCount > 0 ? "text-[#006AFF]" : "text-[#585863]")} />
          </button>

          {/* New badge */}
          <span className="shrink-0 rounded-md bg-[#F5D6C3] px-2 py-0.5 text-[12px] font-bold text-[#8B4513]">
            New
          </span>
        </div>

        <div className="flex-1" />

        <button type="button" className="flex h-[36px] shrink-0 items-center gap-1.5 rounded-lg bg-[#006AFF] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#0052CC]">Save search</button>
        <button type="button" className="flex h-[36px] shrink-0 items-center gap-1 rounded-lg border border-[#E0E0E6] px-3 text-[13px] text-[#585863] transition-colors hover:bg-[#F7F7F9]">
          <HeartIcon className="h-4 w-4" /><span>41</span>
        </button>
      </div>

      {/* Lifestyle dropdown — fixed position to escape overflow clipping */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="fixed z-[9999] min-w-[260px] rounded-xl border border-[#E0E0E6] bg-white p-4 shadow-lg"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          {lifestyleFilters.map((filter, index) => (
            <div key={filter.key} className={cn("flex items-center justify-between py-2.5", index < lifestyleFilters.length - 1 && "border-b border-[#E0E0E6]")}>
              <div className="flex items-center gap-2.5">
                <span className="text-base">{filter.emoji}</span>
                <span className="text-[13px] font-medium text-[#2A2A33]">{filter.label}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={activeFilters.has(filter.key)}
                onClick={() => handleToggle(filter.key)}
                className={cn(
                  "relative h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors",
                  activeFilters.has(filter.key) ? "bg-[#006AFF]" : "bg-[#E0E0E6]"
                )}
              >
                <span className={cn("absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform", activeFilters.has(filter.key) && "translate-x-5")} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
