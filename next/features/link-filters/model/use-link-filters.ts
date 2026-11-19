import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isLinkStatus, limitStep } from "@/entities/link/utils";
import type { LinkStatus } from "@/entities/link/types";

function parsePositiveInt(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function useLinkFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const statusParam = searchParams.get("status");
  const selectedStatus = isLinkStatus(statusParam) ? statusParam : null;
  const selectedTagId = searchParams.get("tagId");
  const selectedPage = parsePositiveInt(searchParams.get("page"), 1);
  const selectedLimit = parsePositiveInt(searchParams.get("limit"), limitStep);

  const replaceQuery = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams.toString());
    mutate(next);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const setStatusFilter = (status: LinkStatus | null) => {
    replaceQuery((next) => {
      if (status) next.set("status", status);
      else next.delete("status");
      next.set("page", "1");
      next.set("limit", String(selectedLimit));
    });
  };

  const setTagFilter = (tagId: string | null) => {
    replaceQuery((next) => {
      if (tagId) next.set("tagId", tagId);
      else next.delete("tagId");
      next.set("page", "1");
      next.set("limit", String(selectedLimit));
    });
  };

  const setPaginationFilter = (page: number, limit: number = selectedLimit) => {
    const nextPage = Math.max(page, 1);
    replaceQuery((next) => {
      next.set("page", String(nextPage));
      next.set("limit", String(limit > 0 ? limit : limitStep));
    });
  };

  return {
    selectedStatus,
    selectedTagId,
    selectedLimit,
    selectedPage,
    setStatusFilter,
    setTagFilter,
    setPaginationFilter,
  };
}
