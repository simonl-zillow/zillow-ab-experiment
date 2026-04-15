import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("...");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(1);
    pages.push("...");
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    pages.push(currentPage - 1);
    pages.push(currentPage);
    pages.push(currentPage + 1);
    pages.push("...");
    pages.push(totalPages);
  }

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 p-6"
    >
      {/* Prev button */}
      {currentPage > 1 ? (
        <a
          href={`?page=${currentPage - 1}`}
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded text-[#006AFF] hover:bg-[#F0F0F5]"
        >
          <ChevronLeftIcon />
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="flex h-9 w-9 items-center justify-center rounded text-[#767680] opacity-50"
        >
          <ChevronLeftIcon />
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-9 w-9 items-center justify-center text-sm font-medium text-[#767680]"
          >
            &hellip;
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            className="flex h-9 w-9 items-center justify-center rounded bg-[#006AFF] text-sm font-medium text-white"
          >
            {page}
          </span>
        ) : (
          <a
            key={page}
            href={`?page=${page}`}
            className="flex h-9 w-9 items-center justify-center rounded text-sm font-medium text-[#006AFF] hover:bg-[#F0F0F5]"
          >
            {page}
          </a>
        )
      )}

      {/* Next button */}
      {currentPage < totalPages ? (
        <a
          href={`?page=${currentPage + 1}`}
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded text-[#006AFF] hover:bg-[#F0F0F5]"
        >
          <ChevronRightIcon />
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="flex h-9 w-9 items-center justify-center rounded text-[#767680] opacity-50"
        >
          <ChevronRightIcon />
        </span>
      )}
    </nav>
  );
}
