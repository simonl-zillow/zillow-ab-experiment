import { NavBar } from "@/components/NavBar";
import { SearchFilterBar } from "@/components/SearchFilterBar";
import { PropertyCardB } from "@/components/variant-b/PropertyCardB";
import { AreaNarrativeBanner } from "@/components/variant-b/AreaNarrativeBanner";
import { MapPlaceholderB } from "@/components/variant-b/MapPlaceholderB";
import { SEOContentSections } from "@/components/SEOContentSections";
import { Footer } from "@/components/Footer";
import { listings, seattleAreaNarrative } from "@/lib/data";

export default function VariantB() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
      <SearchFilterBar />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block lg:w-[45%] xl:w-[42%]">
          <MapPlaceholderB />
        </div>

        <div className="flex-1 overflow-y-auto border-l border-[#E0E0E6]">
          <div className="flex items-start justify-between px-4 pt-4 pb-2">
            <div>
              <h1 className="text-lg font-bold text-[#2A2A33]">
                Real Estate &amp; Homes For Sale
              </h1>
              <p className="text-[13px] text-[#585863]">4,163 results</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-[13px] font-semibold text-[#006AFF] hover:underline"
            >
              Sort: Homes for You
            </button>
          </div>

          {/* Variant B: Area Narrative Banner */}
          <AreaNarrativeBanner narrative={seattleAreaNarrative} />

          <div className="grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-2">
            {listings.map((listing) => (
              <PropertyCardB key={listing.id} listing={listing} />
            ))}
          </div>

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
