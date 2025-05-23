import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show only a window of pages around the current page
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const rangeWithDots: (number | string)[] = [];
    let l: number;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        rangeWithDots.push(i);
      } else if (
        i < left &&
        rangeWithDots[rangeWithDots.length - 1] !== "..."
      ) {
        rangeWithDots.push("...");
      } else if (
        i >= right &&
        rangeWithDots[rangeWithDots.length - 1] !== "..."
      ) {
        rangeWithDots.push("...");
      }
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Anterior
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => (typeof page === "number" ? onPageChange(page) : null)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? "bg-primary text-white"
              : page === "..."
              ? "cursor-default"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
