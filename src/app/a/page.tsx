"use client";

import { useState, useCallback } from "react";
import { NavBar } from "@/components/NavBar";
import { SearchFilterBarA } from "@/components/variant-a/SearchFilterBarA";
import { PropertyCardA } from "@/components/variant-a/PropertyCardA";
import { MapPlaceholderA } from "@/components/variant-a/MapPlaceholderA";
import { SEOContentSections } from "@/components/SEOContentSections";
import { Footer } from "@/components/Footer";
import { listings } from "@/lib/data";
import type { PropertyListing } from "@/types";

function matchesFilters(listing: PropertyListing, filters: Set<string>): boolean {
  if (filters.size === 0) return true;

  const { lifestyle } = listing;

  if (filters.has("short-commute")) {
    const minutes = parseInt(lifestyle.commuteTime, 10);
    if (isNaN(minutes) || minutes >= 15) return false;
  }
  if (filters.has("walkable")) {
    if (lifestyle.walkScore < 70) return false;
  }
  if (filters.has("near-transit")) {
    if (!lifestyle.nearTransit) return false;
  }
  if (filters.has("near-parks")) {
    if (!lifestyle.nearParks) return false;
  }

  return true;
}

export default function VariantA() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const handleFilterChange = useCallback((filters: Set<string>) => {
    setActiveFilters(new Set(filters));
  }, []);

  const filteredListings = listings.filter((l) =>
    matchesFilters(l, activeFilters)
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
      <SearchFilterBarA onFilterChange={handleFilterChange} />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block lg:w-[45%] xl:w-[42%]">
          <MapPlaceholderA />
        </div>

        <div className="flex-1 overflow-y-auto border-l border-[#E0E0E6]">
          <div className="flex items-start justify-between px-4 pt-4 pb-2">
            <div>
              <h1 className="text-lg font-bold text-[#2A2A33]">
                Real Estate &amp; Homes For Sale
              </h1>
              <p className="text-[13px] text-[#585863]">
                {filteredListings.length === listings.length
                  ? "4,163 results"
                  : `${filteredListings.length} of 4,163 results`}
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-[13px] font-semibold text-[#006AFF] hover:underline"
            >
              Sort: Homes for You
            </button>
          </div>

          {filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <p className="text-lg font-semibold text-[#2A2A33]">
                No homes match your lifestyle filters
              </p>
              <p className="mt-1 text-sm text-[#585863]">
                Try removing some filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-2">
              {filteredListings.map((listing) => (
                <PropertyCardA key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-1 border-t border-[#E0E0E6] py-6">
            <span className="flex h-9 w-9 items-center justify-center rounded text-[#767680] opacity-50">‹</span>
            <span className="flex h-9 w-9 items-center justify-center rounded bg-[#006AFF] text-sm font-medium text-white">1</span>
            {[2, 3, 4, 5, 6, 7].map((p) => (
              <a key={p} href="#" className="flex h-9 w-9 items-center justify-center rounded text-sm font-medium text-[#006AFF] hover:bg-[#F0F0F5]">{p}</a>
            ))}
            <span className="flex h-9 w-9 items-center justify-center text-sm text-[#767680]">…</span>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded text-sm font-medium text-[#006AFF] hover:bg-[#F0F0F5]">20</a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded text-sm text-[#006AFF] hover:bg-[#F0F0F5]">›</a>
          </div>

          <SEOContentSections />
          <Footer />
        </div>
      </div>
    </div>
  );
}
