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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatSqft(sqft: number): string {
  return new Intl.NumberFormat("en-US").format(sqft);
}

export function PropertyCard({ listing }: { listing: PropertyListing }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
      {/* Image area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.imageUrl}
          alt={`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges - top left */}
        {listing.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {listing.badges.map((badge) => (
              <span
                key={badge.type}
                className={cn(
                  "rounded px-2 py-0.5 text-[11px] font-bold",
                  badgeColors[badge.type]
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {/* Save button - top right */}
        <button
          type="button"
          aria-label={saved ? "Unsave property" : "Save property"}
          onClick={(e) => {
            e.stopPropagation();
            setSaved((prev) => !prev);
          }}
          className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white"
        >
          {saved ? (
            <HeartFilledIcon className="size-4 text-[#FF5A5F]" />
          ) : (
            <HeartIcon className="size-4 text-[#585863]" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="px-2 py-2">
        {/* Price row with menu */}
        <div className="flex items-start justify-between">
          <p className="text-lg font-bold leading-tight text-[#2A2A33]">
            {formatPrice(listing.price)}
          </p>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full text-[#585863] hover:bg-[#F0F0F5]"
            aria-label="More options"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontalIcon className="size-4" />
          </button>
        </div>

        {/* Stats - inline with status */}
        <p className="text-[13px] text-[#2A2A33]">
          <span className="font-semibold">{listing.beds}</span>
          <span className="text-[#585863]"> bds</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="font-semibold">{listing.baths}</span>
          <span className="text-[#585863]"> ba</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="font-semibold">{formatSqft(listing.sqft)}</span>
          <span className="text-[#585863]"> sqft</span>
          <span className="mx-1 text-[#CCCCCC]">|</span>
          <span className="text-[#585863]">{listing.status}</span>
        </p>

        {/* Address */}
        <p className="mt-0.5 truncate text-[13px] text-[#585863]">
          {listing.address}, {listing.city}, {listing.state}...
        </p>

        {/* MLS attribution */}
        {listing.mlsAttribution && (
          <p className="mt-0.5 truncate text-[11px] text-[#999]">
            {listing.mlsAttribution}
          </p>
        )}
      </div>
    </article>
  );
}
