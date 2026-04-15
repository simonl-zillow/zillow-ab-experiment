export interface PropertyListing {
  id: string;
  price: number;
  priceFormatted: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  sqftFormatted: string;
  status: "Active" | "Pending" | "Sold";
  imageUrl: string;
  detailUrl: string;
  badges: PropertyBadge[];
  mlsAttribution?: string;
  daysOnZillow?: number;
  isSaved?: boolean;
  // Variant A: lifestyle data
  lifestyle: LifestyleData;
  // Variant B: vibe sentence
  vibeLine: string;
}

export interface LifestyleData {
  commuteTime: string;
  walkScore: number;
  nearbyGroceries: number;
  nearTransit: boolean;
  nearParks: boolean;
}

export type PropertyBadgeType = "showcase" | "open-house" | "price-cut" | "new" | "3d-tour" | "days-on-zillow";

export interface PropertyBadge {
  type: PropertyBadgeType;
  label: string;
}

export interface NavMenuItem {
  label: string;
  href: string;
  submenu?: NavSubmenuSection[];
}

export interface NavSubmenuSection {
  title?: string;
  links: NavLink[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SearchFilter {
  label: string;
  value: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NearbyCity {
  name: string;
  avgHomeValue: string;
  href: string;
}

export interface Neighborhood {
  name: string;
  avgHomeValue: string;
  href: string;
}

export interface ZipCode {
  code: string;
  avgHomeValue: string;
  href: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}
