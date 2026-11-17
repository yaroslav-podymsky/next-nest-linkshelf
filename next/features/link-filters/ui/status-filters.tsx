"use client";

import { LINK_STATUSES } from "@/entities/link/types";
import { STATUS_LABELS } from "@/entities/link/utils";
import { useLinkFilters } from "../model/use-link-filters";

export default function StatusFilters() {
  const { selectedStatus, setStatusFilter } = useLinkFilters();

  return (
    <div className="status-filters" role="group" aria-label="Фильтр по статусу">
      <button
        type="button"
        className={
          selectedStatus === null
            ? "status-filter status-filter--active"
            : "status-filter"
        }
        onClick={() => setStatusFilter(null)}
      >
        Все
      </button>
      {LINK_STATUSES.map((status) => (
        <button
          key={status}
          type="button"
          className={
            selectedStatus === status
              ? "status-filter status-filter--active"
              : "status-filter"
          }
          onClick={() => setStatusFilter(status)}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
