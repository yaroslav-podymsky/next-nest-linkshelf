export const LINK_STATUSES = ['todo', 'reading', 'done'] as const;

export type LinkStatus = (typeof LINK_STATUSES)[number];
