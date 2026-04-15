import { ZillowLogo } from "@/components/icons";

const mainLinks = [
  { label: "About", href: "#" },
  { label: "Zestimates", href: "#" },
  { label: "News", href: "#" },
  { label: "Research", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Help", href: "#" },
  { label: "Advertise", href: "#" },
  { label: "Fair Housing Guide", href: "#" },
  { label: "Advocacy", href: "#" },
  { label: "Terms of use", href: "#" },
  { label: "Privacy Notice", href: "#" },
  { label: "Ad Choices", href: "#" },
  { label: "Cookie Preference", href: "#" },
  { label: "Learn", href: "#" },
  { label: "AI", href: "#" },
  { label: "Mobile Apps", href: "#" },
];

const affiliatedBrands = [
  { label: "Trulia", href: "#" },
  { label: "StreetEasy", href: "#" },
  { label: "HotPads", href: "#" },
  { label: "Out East", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E0E0E6] bg-[#F7F7F9] px-6 py-10">
      <div className="mx-auto max-w-[1280px]">
        {/* Section 1: Logo + Main Links */}
        <div>
          <ZillowLogo className="h-5 w-auto" />
          <nav
            className="mt-4 flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#006AFF] no-underline hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Section 2: Affiliated Brands */}
        <div className="mt-6 text-[13px]">
          <span className="text-[#585863]">Also from Zillow Group: </span>
          {affiliatedBrands.map((brand, index) => (
            <span key={brand.label}>
              {index > 0 && (
                <span className="text-[#585863]"> &middot; </span>
              )}
              <a
                href={brand.href}
                className="text-[#006AFF] no-underline hover:underline"
              >
                {brand.label}
              </a>
            </span>
          ))}
        </div>

        {/* Section 3: Legal & Social */}
        <div className="mt-6">
          <a
            href="#"
            className="text-xs text-[#006AFF] no-underline hover:underline"
          >
            Do Not Sell or Share My Personal Information
          </a>

          <p className="mt-3 max-w-[900px] text-xs leading-[18px] text-[#767680]">
            Zillow Group is committed to ensuring digital accessibility for
            individuals with disabilities. We are continuously working to
            improve the accessibility of our web experience for everyone, and we
            welcome feedback and accommodation requests. If you wish to report
            an issue or seek an accommodation, please{" "}
            <a href="#" className="text-[#006AFF] underline">
              let us know
            </a>
            .
          </p>

          <p className="mt-3 max-w-[900px] text-xs leading-[18px] text-[#767680]">
            Zillow, Inc. holds real estate brokerage{" "}
            <a href="#" className="text-[#006AFF] underline">
              licenses
            </a>{" "}
            in multiple states. Zillow (Canada), Inc. holds real estate
            brokerage licenses in multiple provinces.
          </p>

          <p className="mt-3 max-w-[900px] text-xs leading-[18px] text-[#767680]">
            NMLS #{" "}
            <a href="#" className="text-[#006AFF] underline">
              10287
            </a>
            . California DRE #01925535. Zillow Home Loans is an Equal Housing
            Lender.
          </p>

          <div className="mt-4 flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[#006AFF] no-underline hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Section 4: Copyright */}
        <div className="mt-6">
          <p className="text-xs text-[#767680]">&copy; 2006-2026 Zillow</p>
          <p className="mt-1 text-xs text-[#767680]">
            Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
}
