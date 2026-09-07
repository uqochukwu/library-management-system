import React from "react";

export default function Pagination({
  pageNumber,
  totalPages,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="member-pagination">
      <button
        type="button"
        onClick={onPrevious}
        disabled={pageNumber <= 1}
      >
        PREVIOUS
      </button>

      <span>
        Page {pageNumber} of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={pageNumber >= totalPages}
      >
        NEXT
      </button>
    </div>
  );
}
