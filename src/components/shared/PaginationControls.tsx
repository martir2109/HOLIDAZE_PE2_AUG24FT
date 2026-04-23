import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "../../interfaces/pagination";

/**
 * Displays pagination controls with previous and next buttons.
 * Shows up to 3 page buttons at a time.
 * Displays "..." when there are hidden pages before or after the visible number range.
 *
 * @param currentPage - The current page that is viewed.
 * @param totalPages - The total number of pages.
 * @param onPageChange - Callback for when the user changes page.
 * @returns The pagination controls.
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);
    if (end - start < 2) start = Math.max(1, end - 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        type="button"
        title="Left arrow button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-sm border border-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100"
      >
        <ChevronLeft size={20} />
      </button>

      {pages[0] > 1 && <span className="px-2 text-medium-dark-grey">...</span>}

      {pages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg text-sm font-medium shadow-sm border cursor-pointer ${
            page === currentPage
              ? "bg-primary text-white border-primary"
              : "bg-white border-gray-200 hover:bg-orange-100"
          }`}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <span className="px-2">...</span>
      )}

      <button
        type="button"
        title="Right arrow button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-sm border border-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
