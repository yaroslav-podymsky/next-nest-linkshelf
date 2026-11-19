"use client";

import { limitStep } from "@/entities/link/utils";
import { useLinkFilters } from "../model/use-link-filters";

type PaginationFiltersProps = {
  total: number;
};

export default function PaginationFilters({ total }: PaginationFiltersProps) {
  const { selectedPage, selectedLimit, setPaginationFilter } = useLinkFilters();
  const limit = selectedLimit || limitStep;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canGoPrev = selectedPage > 1;
  const canGoNext = selectedPage < totalPages;

  return (
    <div className="pagination-filters">
      <button
        type="button"
        className="pagination-filters-btn"
        disabled={!canGoPrev}
        onClick={() => setPaginationFilter(selectedPage - 1, limit)}
      >
        Назад
      </button>
      <p className="pagination-filters-meta">
        Стр. {selectedPage} из {totalPages}
      </p>
      <button
        type="button"
        className="pagination-filters-btn"
        disabled={!canGoNext}
        onClick={() => setPaginationFilter(selectedPage + 1, limit)}
      >
        Дальше
      </button>
    </div>
  );
}
