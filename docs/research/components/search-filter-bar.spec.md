# SearchFilterBar Specification

## Overview
- **Target file:** `src/components/SearchFilterBar.tsx`
- **Interaction model:** click-driven (tabs, filter dropdowns)

## DOM Structure
- Sticky bar below nav
- Row 1: Tabs (For Sale | Rent | Sold) + Search input
- Row 2: Filter buttons (Price, Beds & Baths, Home Type, More) + Save search + Sort

## Computed Styles

### Container
- position: sticky
- top: 60px (below nav)
- z-index: 40
- background: #FFFFFF
- border-bottom: 1px solid #E0E0E6
- padding: 12px 24px

### Tabs
- display: flex, gap: 0
- each tab: padding: 8px 16px, font-size: 14px, font-weight: 600
- active tab: color: #006AFF, border-bottom: 2px solid #006AFF
- inactive tab: color: #585863, border-bottom: 2px solid transparent
- hover: color: #2A2A33

### Search input
- flex: 1
- height: 40px
- padding: 8px 16px 8px 40px (left padding for search icon)
- border: 1px solid #E0E0E6
- border-radius: 8px
- font-size: 14px
- background: #FFFFFF
- focus: border-color: #006AFF, box-shadow: 0 0 0 2px rgba(0,106,255,0.2)

### Filter buttons
- display: flex, gap: 8px
- each button: height: 36px, padding: 0 16px
- border: 1px solid #E0E0E6
- border-radius: 20px (pill shape)
- font-size: 13px
- font-weight: 500
- color: #2A2A33
- background: #FFFFFF
- hover: background: #F7F7F9
- active/open: border-color: #006AFF, color: #006AFF

### Save search button
- color: #006AFF
- font-weight: 600
- background: transparent

### Sort dropdown
- font-size: 13px
- color: #585863
- cursor: pointer

## Responsive
- **Desktop:** Tabs + search on one row, filters on second row
- **Mobile:** Search collapses to icon, filters horizontal scroll
