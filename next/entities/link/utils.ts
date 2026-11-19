import { LinkStatus, LINK_STATUSES } from "./types";

export function isLinkStatus(value: string | null): value is LinkStatus {
  return value !== null && LINK_STATUSES.includes(value as LinkStatus);
}
export const STATUS_LABELS: Record<LinkStatus, string> = {
  todo: "К прочтению",
  reading: "Читаю",
  done: "Готово",
};

export const limitStep = 3;
