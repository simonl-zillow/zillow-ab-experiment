import { nearbyCities, neighborhoods } from "@/lib/data";

function LinkList({ links }: { links: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="text-[13px] text-[#006AFF] hover:underline"
        >
          {link}
        </a>
      ))}
    </div>
  );
}

function SubSection({
  heading,
  links,
}: {
  heading: string;
  links: string[];
}) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-[#2A2A33]">
        {heading}
      </h3>
      <LinkList links={links} />
    </div>
  );
}

function CityGrid({
  items,
}: {
  items: { name: string; avgHomeValue: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.name}>
          <a
            href="#"
            className="text-sm text-[#006AFF] hover:underline"
          >
            {item.name}
          </a>
          <p className="text-[13px] text-[#585863]">
            Avg. Home Value: {item.avgHomeValue}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SEOContentSections() {
  return (
    <section className="bg-white px-6 py-8">
      {/* Find a Home You'll Love */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-[#2A2A33]">
          Find a Home You&apos;ll Love
        </h2>

        <SubSection
          heading="Search by Bedroom Count"
          links={[
            "1 Bedroom Homes",
            "2 Bedroom Homes",
            "3 Bedroom Homes",
            "4 Bedroom Homes",
            "5 Bedroom Homes",
          ]}
        />

        <SubSection
          heading="Popular Searches"
          links={[
            "Newest Listings",
            "3D Virtual Tours",
            "No HOA Homes",
            "Homes with Pool",
            "Luxury Homes",
            "Waterfront Homes",
            "Price Reduced",
          ]}
        />

        <SubSection
          heading="Select Property Type"
          links={[
            "Single Family Homes",
            "Condos",
            "Townhomes",
            "Land",
            "Duplexes",
          ]}
        />
      </div>

      {/* Nearby Cities */}
      <div className="mt-8 border-t border-[#E0E0E6] pt-8">
        <h2 className="mb-4 text-xl font-bold text-[#2A2A33]">
          Nearby Cities
        </h2>
        <CityGrid items={nearbyCities} />
      </div>

      {/* Seattle Neighborhoods */}
      <div className="mt-8 border-t border-[#E0E0E6] pt-8">
        <h2 className="mb-4 text-xl font-bold text-[#2A2A33]">
          Seattle Neighborhoods
        </h2>
        <CityGrid items={neighborhoods} />
      </div>
    </section>
  );
}
