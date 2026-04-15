"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HeartIcon, HeartFilledIcon, MoreHorizontalIcon } from "@/components/icons";
import type { PropertyListing, PropertyBadgeType } from "@/types";

const badgeColors: Record<PropertyBadgeType, string> = {
  showcase: "bg-[#7B61FF] text-white",
  "open-house": "bg-[#0B6E0B] text-white",
  "price-cut": "bg-[#D32F2F] text-white",
  new: "bg-[#006AFF] text-white",
  "3d-tour": "bg-[#006AFF] text-white",
  "days-on-zillow": "bg-black/60 text-white",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

function formatSqft(sqft: number): string {
  return new Intl.NumberFormat("en-US").format(sqft);
}

export function PropertyCardA({ listing }: { listing: PropertyListing }) {
  const [saved, setSaved] = useState(false);

  const lifestylePills: { emoji: string; label: string }[] = [];
  if (listing.lifestyle.commuteTime) {
    lifestylePills.push({ emoji: "\u{1F697}", label: listing.lifestyle.commuteTime });
  }
  if (listing.lifestyle.walkScore > 0) {
    lifestylePills.push({ emoji: "\u{1F6B6}", label: `Walk Score ${listing.lifestyle.walkScore}` });
  }
  if (listing.lifestyle.nearbyGroceries > 0) {
    lifestylePills.push({ emoji: "\u{1F6D2}", label: `${listing.lifestyle.nearbyGroceries} groceries nearby` });
  }
  const visiblePills = lifestylePills.slice(0, 3);

  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={listing.imageUrl} alt={`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {listing.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {listing.badges.map((badge) => (
              <span key={badge.type} className={cn("rounded px-2 py-0.5 text-[11px] font-bold", badgeColors[badge.type])}>{badge.label}</span>
            ))}
          </div>
        )}
        <button type="button" aria-label={saved ? "Unsave property" : "Save property"} onClick={(e) => { e.stopPropagation(); setSaved((prev) => !prev); }} className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white">
          {saved ? <HeartFilledIcon className="size-4 text-[#FF5A5F]" /> : <HeartIcon className="size-4 text-[#585863]" />}
        </button>
      </div>

      <div className="px-2 py-2">
        <div className="flex items-start justify-between">
          <p className="text-lg font-bold leading-tight text-[#2A2A33]">{formatPrice(listing.price)}</p>
          <button type="button" className="flex size-6 items-center justify-center rounded-full text-[#585863] hover:bg-[#F0F0F5]" aria-label="More options" onClick={(e) => e.stopPropagation()}>
            <MoreHorizontalIcon className="size-4" />
          </button>
        </div>

        <p className="text-[13px] text-[#2A2A33]">
          <span className="font-semibold">{listing.beds}</span><span className="text-[#585863]"> bds</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="font-semibold">{listing.baths}</span><span className="text-[#585863]"> ba</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="font-semibold">{formatSqft(listing.sqft)}</span><span className="text-[#585863]"> sqft</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="text-[#585863]">{listing.status}</span>
        </p>

        <p className="mt-0.5 truncate text-[13px] text-[#585863]">{listing.address}, {listing.city}, {listing.state}...</p>

        {/* Lifestyle Snapshot — Variant A feature */}
        {visiblePills.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {visiblePills.map((pill) => (
              <span key={pill.label} className="inline-flex items-center gap-1 rounded-full bg-[#F0F0F5] px-2 py-0.5 text-[12px] font-medium text-[#585863]">
                <span>{pill.emoji}</span>
                <span>{pill.label}</span>
              </span>
            ))}
          </div>
        )}

        {listing.mlsAttribution && (
          <p className="mt-0.5 truncate text-[11px] text-[#999]">{listing.mlsAttribution}</p>
        )}
      </div>
    </article>
  );
}
