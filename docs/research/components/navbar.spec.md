# NavBar Specification

## Overview
- **Target file:** `src/components/NavBar.tsx`
- **Interaction model:** click-driven (dropdown menus on hover/click)

## DOM Structure
- Sticky header at top of page
- Container with max-width, centered
- Left: Zillow logo link
- Center: Navigation menu items (desktop only)
- Right: Sign in / Join buttons
- Mobile: hamburger menu icon (replaces center nav)

## Computed Styles

### Header container
- position: sticky
- top: 0
- z-index: 50
- background: #FFFFFF
- border-bottom: 1px solid #E0E0E6
- height: 60px
- padding: 0 24px

### Logo
- height: 24px (desktop), 20px (mobile)
- color: #006AFF

### Nav items (desktop)
- display: flex, gap: 4px
- each item: padding: 8px 12px
- font-size: 14px
- font-weight: 600
- color: #2A2A33
- border-radius: 8px
- hover: background: #F0F0F5

### Sign in / Join buttons
- font-size: 14px
- font-weight: 600
- "Sign in": color: #006AFF, background: transparent
- "Join": color: #006AFF, background: transparent, border: none

## Responsive Behavior
- **Desktop (1440px):** Full nav with all items visible
- **Tablet (768px):** Some nav items may collapse
- **Mobile (390px):** Logo + hamburger menu + sign in only
