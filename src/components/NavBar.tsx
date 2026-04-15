"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ZillowLogo, BellIcon } from "@/components/icons";

const leftNavItems = [
  { label: "Buy", href: "#" },
  { label: "Rent", href: "#" },
  { label: "Sell", href: "#" },
  { label: "Get a mortgage", href: "#" },
  { label: "Find an agent", href: "#" },
] as const;

const rightNavItems = [
  { label: "Manage rentals", href: "#" },
  { label: "Advertise", href: "#" },
  { label: "Get help", href: "#" },
] as const;

export function NavBar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-[52px] items-center justify-between",
        "border-b border-[#E0E0E6] bg-white px-4"
      )}
    >
      {/* Left nav items */}
      <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
        {leftNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-2.5 py-1.5 text-[13px] font-semibold text-[#2A2A33] transition-colors hover:text-[#006AFF]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Center: Logo */}
      <Link href="/" aria-label="Zillow Home" className="absolute left-1/2 -translate-x-1/2">
        <ZillowLogo className="h-[28px] w-auto" />
      </Link>

      {/* Right nav items + icons */}
      <div className="hidden lg:flex items-center gap-0.5">
        {rightNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-2.5 py-1.5 text-[13px] font-semibold text-[#2A2A33] transition-colors hover:text-[#006AFF]"
          >
            {item.label}
          </Link>
        ))}

        {/* Notification bell */}
        <button
          type="button"
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-[#585863] transition-colors hover:bg-[#F0F0F5]"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
        </button>

        {/* User avatar */}
        <button
          type="button"
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#E36209] text-xs font-bold text-white"
          aria-label="User menu"
        >
          S
        </button>
      </div>

      {/* Mobile: just logo is visible via the absolute center positioning */}
      <div className="lg:hidden" />
    </header>
  );
}
