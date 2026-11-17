import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isLinkStatus } from "@/entities/link/utils";
import type { LinkStatus } from "@/entities/link/types";

export function useLinkFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const statusParam = searchParams.get("status");
  const selectedStatus = isLinkStatus(statusParam) ? statusParam : null;
  const selectedTagId = searchParams.get("tagId");

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
    });
  };

  const setTagFilter = (tagId: string | null) => {
    replaceQuery((next) => {
      if (tagId) next.set("tagId", tagId);
      else next.delete("tagId");
    });
  };

  return {
    selectedStatus,
    selectedTagId,
    setStatusFilter,
    setTagFilter,
  };
}
