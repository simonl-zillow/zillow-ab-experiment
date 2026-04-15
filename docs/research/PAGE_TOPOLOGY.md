# Zillow Seattle Search Results — Page Topology

## Target URL
https://www.zillow.com/seattle-wa/

## Page Type
Real estate search results page — split layout with listings list and map

## Sections (top to bottom)

### 1. Navigation Bar (sticky, z-50)
- **Interaction model:** click-driven (dropdown menus)
- Zillow logo (left)
- Main nav links: Buy, Rent, Sell, Get a mortgage, Find an agent, Manage rentals, Advertise, Get help
- Right side: Sign in / Join buttons
- Background: white, border-bottom shadow

### 2. Search & Filter Bar (sticky below nav, z-40)
- **Interaction model:** click-driven (dropdowns, tabs)
- Tabs: For Sale (active), Rent, Sold
- Search input with location
- Filter buttons: Price, Beds & Baths, Home Type, More
- Save search button
- Sort dropdown: "Homes for You"

### 3. Breadcrumbs
- **Interaction model:** static links
- Path: For Sale > Washington > King County > Seattle

### 4. Results Header
- **Interaction model:** static
- "Seattle WA Real Estate & Homes For Sale"
- "2,263 results"

### 5. Split Layout Container
- Left: Listings (scrollable, ~50% width on desktop, 100% on mobile)
- Right: Map (50% width on desktop, hidden on mobile)

### 6. Property Listing Cards (within left panel)
- **Interaction model:** click to navigate, hover for effects
- Single column list of cards
- Each card: image, price, beds/baths/sqft, address, status badges
- Lazy loading / pagination

### 7. Pagination
- **Interaction model:** click-driven
- Pages 1-20, prev/next buttons

### 8. SEO Content Sections (below listings)
- **Interaction model:** static links
- "Find a Home You'll Love" — search by bedroom, price, amenity, property type
- Nearby Cities with average home values
- Seattle Neighborhoods with values
- Seattle Zip Codes with values

### 9. Footer
- **Interaction model:** static links, click-driven
- Logo, main links, affiliated brands, legal, social, app badges
- Bottom nav: Search, Updates, Favorites, Home Loans, Inbox

## Layout Notes
- Desktop: split-panel layout (listings | map)
- Tablet: likely listings-focused with map toggle
- Mobile: full-width listings, map as overlay/toggle
- Navigation and search bar are sticky
