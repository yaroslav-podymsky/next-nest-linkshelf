"use client";

import { useEffect, useState } from "react";
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

  const loadCollections = async () => {
    try {
      const data = await apiFetch<Collection[]>("/collections");
      setCollections(data ?? []);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось загрузить коллекции"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <PageShell title="Коллекции" subtitle="Папки для учебных ссылок." wide>
      {loading ? <p className="text-muted">Загрузка коллекций...</p> : null}

      {!loading && error ? <p className="form-error">{error}</p> : null}

      {!loading && !error && collections.length === 0 ? (
        <p className="collections-empty">
          Коллекций пока нет. Создайте первую.
        </p>
      ) : null}

      {!loading && collections.length > 0 ? (
        <div className="collections-list">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="collection-item collection-item-link"
            >
              <h2 className="collection-item-title">{collection.title}</h2>
              <p className="collection-item-id">{collection.id}</p>
            </Link>
          ))}
        </div>
      ) : null}

      <hr className="collections-divider" />

      <h2 className="collections-form-title">Новая коллекция</h2>
      <CollectionsForm onCreated={loadCollections} />

      <div className="stack collections-footer">
        <ButtonLink href="/" variant="secondary">
          На главную
        </ButtonLink>
        <p className="text-center">
          <Link href="/me">Мой профиль</Link>
        </p>
      </div>
    </PageShell>
  );
}
