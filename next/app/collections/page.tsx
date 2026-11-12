"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import CollectionsForm from "@/features/collection-create/ui";
import { apiFetch } from "@/shared/api/client";
import { ButtonLink } from "@/shared/ui/button-link";
import { PageShell } from "@/shared/ui/page-shell";

type Collection = {
  id: string;
  title: string;
};

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCollections = useCallback(async () => {
    setError(null);
    try {
      const data = await apiFetch<Collection[]>("/collections");
      setCollections(data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load collections"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCollections();
  }, [loadCollections]);

  return (
    <PageShell
      title="Collections"
      subtitle="Your folders for learning links."
      wide
    >
      {loading ? <p className="text-muted">Loading collections...</p> : null}

      {!loading && error ? <p className="form-error">{error}</p> : null}

      {!loading && !error && collections.length === 0 ? (
        <p className="collections-empty">
          No collections yet. Create the first one.
        </p>
      ) : null}

      {!loading && collections.length > 0 ? (
        <div className="collections-list">
          {collections.map((collection) => (
            <article key={collection.id} className="collection-item">
              <h2 className="collection-item-title">{collection.title}</h2>
              <p className="collection-item-id">{collection.id}</p>
            </article>
          ))}
        </div>
      ) : null}

      <hr className="collections-divider" />

      <h2 className="collections-form-title">New collection</h2>
      <CollectionsForm onCreated={loadCollections} />

      <div className="stack collections-footer">
        <ButtonLink href="/" variant="secondary">
          Home
        </ButtonLink>
        <p className="text-center">
          <Link href="/me">My profile</Link>
        </p>
      </div>
    </PageShell>
  );
}
