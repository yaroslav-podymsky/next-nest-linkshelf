"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { fetchCollectionLinks, setLinkTag } from "@/entities/link/api";
import type { CollectionLink } from "@/entities/link/types";
import { fetchTags } from "@/entities/tag/api";
import type { Tag } from "@/entities/tag/types";
import { useLinkFilters } from "@/features/link-filters/model/use-link-filters";
import StatusFilters from "@/features/link-filters/ui/status-filters";
import TagFilters from "@/features/link-filters/ui/tag-filters";
import PaginationFilters from "@/features/link-filters/ui/pagination-filters";
import LinkCreateForm from "@/features/link-create/ui";
import TagCreateForm from "@/features/tag-create/ui";
import { ButtonLink } from "@/shared/ui/button-link";
import { PageShell } from "@/shared/ui/page-shell";
import LinksList from "@/widgets/links-list/ui";

const CollectionStats = dynamic(() => import("@/widgets/collection-stats/ui"), {
  ssr: false,
});

export default function CollectionDetailsPage() {
  const params = useParams<{ id: string }>();
  const collectionId = params.id;
  const { selectedStatus, selectedTagId, selectedLimit, selectedPage } =
    useLinkFilters();

  const [links, setLinks] = useState<CollectionLink[]>([]);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagError, setTagError] = useState<string | null>(null);

  const loadTags = async () => {
    try {
      const data = await fetchTags();
      setTags(data ?? []);
      setTagError(null);
    } catch (err) {
      setTagError(
        err instanceof Error ? err.message : "Не удалось загрузить теги"
      );
    }
  };

  const loadLinks = useCallback(
    async (mode: "initial" | "refresh" = "refresh") => {
      if (!collectionId) return;

      if (mode === "initial") setLoading(true);
      else setRefreshing(true);

      try {
        const data = await fetchCollectionLinks({
          collectionId,
          status: selectedStatus,
          tagId: selectedTagId,
          limit: selectedLimit,
          page: selectedPage,
        });
        setLinks(data.items ?? []);
        setTotal(data.total ?? 0);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Не удалось загрузить ссылки"
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [collectionId, selectedLimit, selectedPage, selectedStatus, selectedTagId]
  );

  const toggleLinkTag = async (
    linkId: string,
    tagId: string,
    attached: boolean
  ) => {
    try {
      await setLinkTag(linkId, tagId, attached);
      await loadLinks("refresh");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось обновить теги ссылки"
      );
    }
  };

  const prevCollectionIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const isNewCollection = prevCollectionIdRef.current !== collectionId;
    prevCollectionIdRef.current = collectionId;

    if (isNewCollection) {
      void loadTags();
      void loadLinks("initial");
      return;
    }

    void loadLinks("refresh");
  }, [
    collectionId,
    selectedStatus,
    selectedTagId,
    selectedPage,
    selectedLimit,
    loadLinks,
  ]);

  const emptyMessage = (() => {
    if (selectedStatus && selectedTagId) {
      return "Нет ссылок с этим статусом и тегом.";
    }
    if (selectedStatus) return "Нет ссылок с этим статусом.";
    if (selectedTagId) return "Нет ссылок с этим тегом.";
    return "Ссылок пока нет. Добавьте первую.";
  })();

  return (
    <PageShell title="Коллекция" subtitle="Ссылки внутри этой коллекции." wide>
      <p className="collection-id-badge">ID: {collectionId}</p>

      <CollectionStats
        allCount={total}
        doneCount={links.filter((el) => el.status === "done").length}
        readingCount={links.filter((el) => el.status === "reading").length}
        todoCount={links.filter((el) => el.status === "todo").length}
      />

      <StatusFilters />
      <TagFilters tags={tags} />
      <TagCreateForm onCreated={loadTags} />
      {tagError ? <p className="form-error">{tagError}</p> : null}

      {loading ? <p className="text-muted">Загрузка ссылок...</p> : null}
      {!loading && refreshing ? (
        <p className="text-muted">Обновляем список...</p>
      ) : null}
      {!loading && error ? <p className="form-error">{error}</p> : null}

      {!loading && !error && links.length === 0 ? (
        <p className="collections-empty">{emptyMessage}</p>
      ) : null}

      {!loading && total > 0 ? <PaginationFilters total={total} /> : null}

      {!loading && links.length > 0 ? (
        <LinksList links={links} tags={tags} onToggleTag={toggleLinkTag} />
      ) : null}

      <hr className="collections-divider" />

      <h2 className="collections-form-title">Новая ссылка</h2>
      {collectionId ? (
        <LinkCreateForm collectionId={collectionId} onCreated={loadLinks} />
      ) : null}

      <div className="stack collections-footer">
        <ButtonLink href="/collections" variant="secondary">
          К коллекциям
        </ButtonLink>
        <p className="text-center">
          <Link href="/">На главную</Link>
        </p>
      </div>
    </PageShell>
  );
}
