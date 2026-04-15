# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static links

## DOM Structure
- Full-width footer with gray background
- Top section: Logo + main links (horizontal list)
- Middle section: Affiliated brands links
- Bottom section: Legal text, social links, app badges, copyright

## Computed Styles

### Footer container
- background: #F7F7F9
- padding: 40px 24px
- border-top: 1px solid #E0E0E6

### Logo
- Zillow logo, height: 20px
- margin-bottom: 16px

### Main links
- display: flex, flex-wrap: wrap, gap: 8px 24px
- font-size: 13px
- color: #006AFF
- text-decoration: none
- hover: text-decoration: underline

### Affiliated brands
- margin-top: 24px
- font-size: 13px
- "Also from Zillow Group: " + Trulia, StreetEasy, HotPads, Out East links
- color: #006AFF

### Legal text
- margin-top: 24px
- font-size: 12px
- line-height: 18px
- color: #767680
- max-width: 900px

### Social links
- display: flex, gap: 16px
- icons: 24x24px
- color: #585863
- hover: color: #2A2A33

### App badges
- display: flex, gap: 12px
- App Store / Google Play SVG badges
- height: 40px

### Copyright
- font-size: 12px
- color: #767680
- margin-top: 16px

## Text Content
- Main links: About, Zestimates, News, Research, Careers, Help, Advertise, Fair Housing Guide, Advocacy, Terms of use, Privacy Notice, Ad Choices, Cookie Preference, Learn, AI, Mobile Apps
- Affiliated: Trulia, StreetEasy, HotPads, Out East
- Legal: "Do Not Sell or Share My Personal Information" + Real estate licenses + NMLS info + Equal Housing Opportunity

## Responsive
- **Desktop:** Multi-column footer
- **Mobile:** Single column, stacked sections
