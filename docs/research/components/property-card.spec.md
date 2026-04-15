# PropertyCard Specification

## Overview
- **Target file:** `src/components/PropertyCard.tsx`
- **Interaction model:** click to navigate, hover for shadow effect

## DOM Structure
- Card wrapper (article element)
  - Image container (aspect-ratio ~3:2)
    - Property photo (img)
    - Badge overlays (top-left): Showcase / Open House / Price Cut / New
    - Save/heart button (top-right)
  - Content area
    - Price (large, bold)
    - Stats row: beds · baths · sqft
    - Address (link)
    - MLS attribution (small text)

## Computed Styles

### Card wrapper
- background: #FFFFFF
- border-bottom: 1px solid #E0E0E6
- padding: 12px 0
- cursor: pointer
- transition: box-shadow 0.2s ease
- hover: zillow-shadow-card-hover

### Image container
- position: relative
- width: 100%
- aspect-ratio: 16/10
- border-radius: 8px
- overflow: hidden

### Property image
- width: 100%
- height: 100%
- object-fit: cover

### Badge (general)
- position: absolute
- top: 8px
- left: 8px
- padding: 2px 8px
- border-radius: 4px
- font-size: 11px
- font-weight: 700
- text-transform: uppercase
- letter-spacing: 0.5px

### Badge variants
- showcase: background: #7B61FF, color: #FFFFFF
- open-house: background: #0B6E0B, color: #FFFFFF
- price-cut: background: #D32F2F, color: #FFFFFF
- new: background: #006AFF, color: #FFFFFF
- days-on-zillow: background: rgba(0,0,0,0.6), color: #FFFFFF

### Save button
- position: absolute
- top: 8px
- right: 8px
- width: 32px
- height: 32px
- border-radius: 50%
- background: rgba(255,255,255,0.9)
- display: flex, align-items: center, justify-content: center
- hover: background: #FFFFFF

### Heart icon
- color: #767680 (unsaved), #FF5A5F (saved)
- width: 18px, height: 18px

### Price
- font-size: 22px
- font-weight: 700
- color: #2A2A33
- margin-top: 8px

### Stats row
- font-size: 14px
- color: #2A2A33
- display: flex, gap: 4px
- items separated by " · "
- font-weight: 600 for numbers, 400 for labels (bds, ba, sqft)

### Address
- font-size: 14px
- color: #585863
- margin-top: 2px
- text-decoration: none
- hover: text-decoration: underline

### MLS attribution
- font-size: 11px
- color: #767680
- margin-top: 4px

## Responsive
- **Desktop:** Cards in single column within listings panel (~50% viewport)
- **Mobile:** Cards full width
