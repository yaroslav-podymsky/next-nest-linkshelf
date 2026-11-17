import { apiFetch } from "@/shared/api/client";
import type { CollectionLink, LinkStatus } from "./types";

type FetchLinksParams = {
  collectionId: string;
  status?: LinkStatus | null;
  tagId?: string | null;
};

export function fetchCollectionLinks({
  collectionId,
  status,
  tagId,
}: FetchLinksParams) {
  const query = new URLSearchParams({ collectionId });
  if (status) query.set("status", status);
  if (tagId) query.set("tagId", tagId);
  return apiFetch<CollectionLink[]>(`/links?${query.toString()}`);
}

export function setLinkTag(
  linkId: string,
  tagId: string,
  attached: boolean
) {
  return apiFetch(`/links/${linkId}/tags/${tagId}`, {
    method: attached ? "DELETE" : "POST",
  });
}
