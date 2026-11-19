import { Tag } from "../tag/types";

export const LINK_STATUSES = ["todo", "reading", "done"] as const;
export type LinkStatus = (typeof LINK_STATUSES)[number];

export type CollectionLink = {
  id: string;
  title: string;
  url: string;
  status: LinkStatus;
  tags?: Tag[];
};

export type LinksListResponse = {
  items: CollectionLink[];
  total: number;
  page: number;
  limit: number;
};
