import type { BreadcrumbItem } from "@/types";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 bg-white px-6 py-2 text-xs text-[#767680]"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className="text-[#767680]">
                &gt;
              </span>
            )}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-[#006AFF] hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-medium text-[#2A2A33]">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
