"use client";

import type { Tag } from "@/entities/tag/types";
import { useLinkFilters } from "../model/use-link-filters";

type TagFiltersProps = {
  tags: Tag[];
};

export default function TagFilters({ tags }: TagFiltersProps) {
  const { selectedTagId, setTagFilter } = useLinkFilters();

  return (
    <div className="status-filters" role="group" aria-label="Фильтр по тегу">
      <button
        type="button"
        className={
          selectedTagId === null
            ? "status-filter status-filter--active"
            : "status-filter"
        }
        onClick={() => setTagFilter(null)}
      >
        Все теги
      </button>
      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          className={
            selectedTagId === tag.id
              ? "status-filter status-filter--active"
              : "status-filter"
          }
          onClick={() =>
            setTagFilter(selectedTagId === tag.id ? null : tag.id)
          }
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
