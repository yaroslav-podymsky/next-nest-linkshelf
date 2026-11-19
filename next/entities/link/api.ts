import { apiFetch } from "@/shared/api/client";
import { limitStep } from "./utils";
import type { CollectionLink, LinkStatus, LinksListResponse } from "./types";

type FetchLinksParams = {
  collectionId: string;
  status?: LinkStatus | null;
  tagId?: string | null;
  page?: number | null;
  limit?: number | null;
};

export function fetchCollectionLinks({
  collectionId,
  status,
  tagId,
  page = 1,
  limit = limitStep,
}: FetchLinksParams) {
  const query = new URLSearchParams({ collectionId });
  if (status) query.set("status", status);
  if (tagId) query.set("tagId", tagId);
  query.set("page", String(page && page > 0 ? page : 1));
  query.set("limit", String(limit && limit > 0 ? limit : limitStep));
  return apiFetch<LinksListResponse>(`/links?${query.toString()}`);
}

export function setLinkTag(linkId: string, tagId: string, attached: boolean) {
  return apiFetch<CollectionLink>(`/links/${linkId}/tags/${tagId}`, {
    method: attached ? "DELETE" : "POST",
  });
}
