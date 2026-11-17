import { apiFetch } from "@/shared/api/client";
import type { Tag } from "./types";

export function fetchTags() {
  return apiFetch<Tag[]>("/tags");
}
