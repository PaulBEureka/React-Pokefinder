import { useMemo } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    // If total pages is less than the page numbers we want to show, return the range
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: No left dots, only right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPages];
    }

    // Case 3: No right dots to show, only left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, "...", ...rightRange];
    }

    // Case 4: Both left and right dots to show
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [totalPages, siblingCount, currentPage]);

  // Utility function to create range of numbers
  function range(start, end) {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center justify-center pt-8">
      {/* Previous Button */}
      <button
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {/* Page Numbers */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span key={index} className="px-3 py-2">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }

        return (
          <button
            key={index}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pageNumber === currentPage
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === lastPage
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
