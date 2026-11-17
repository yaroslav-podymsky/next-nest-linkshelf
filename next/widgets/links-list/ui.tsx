"use client";

import type { CollectionLink } from "@/entities/link/types";
import { STATUS_LABELS } from "@/entities/link/utils";
import type { Tag } from "@/entities/tag/types";

type LinksListProps = {
  links: CollectionLink[];
  tags: Tag[];
  onToggleTag: (
    linkId: string,
    tagId: string,
    attached: boolean
  ) => void | Promise<void>;
};

export default function LinksList({
  links,
  tags,
  onToggleTag,
}: LinksListProps) {
  return (
    <div className="links-list">
      {links.map((link) => (
        <article key={link.id} className="link-item">
          <h2 className="link-item-title">{link.title}</h2>
          <a
            className="link-item-url"
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.url}
          </a>
          <p className="link-item-status">
            Статус: {STATUS_LABELS[link.status] ?? link.status}
          </p>
          {tags.length > 0 ? (
            <fieldset className="link-item-tags-fieldset">
              <legend className="link-item-tags-legend">Теги</legend>
              <div className="link-item-tags-list">
                {tags.map((tag) => {
                  const attached =
                    link.tags?.some((item) => item.id === tag.id) ?? false;
                  return (
                    <label key={tag.id} className="link-item-tag-check">
                      <input
                        type="checkbox"
                        checked={attached}
                        onChange={() =>
                          void onToggleTag(link.id, tag.id, attached)
                        }
                      />
                      <span>{tag.name}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : (
            <p className="link-item-tags">Тегов пока нет — создайте выше</p>
          )}
        </article>
      ))}
    </div>
  );
}
