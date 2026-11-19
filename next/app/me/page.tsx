"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/shared/api/client";
import { ButtonLink } from "@/shared/ui/button-link";
import { PageShell } from "@/shared/ui/page-shell";
import LogoutButton from "@/features/auth/ui/logout/ui";

type MeResponse = {
  userId: string;
  email: string;
};

export default function MePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const me = await apiFetch<MeResponse>("/auth/me");
        setData(me);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Не удалось загрузить профиль"
        );
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <PageShell title="Мой профиль" subtitle="Загрузка...">
        <p className="text-muted">Подождите</p>
      </PageShell>
    );
  }

  return (
    <PageShell title="Мой профиль" subtitle="Данные с Nest: GET /auth/me">
      {data ? (
        <div className="profile-card">
          <div className="profile-row">
            <p className="profile-label">ID пользователя</p>
            <p className="profile-value">{data.userId}</p>
          </div>
          <div className="profile-row">
            <p className="profile-label">Email</p>
            <p className="profile-value">{data.email}</p>
          </div>
        </div>
      ) : null}

      {error ? <p className="form-error">{error}</p> : null}

      <div className="stack">
        <ButtonLink href="/">На главную</ButtonLink>
        <ButtonLink href="/collections" variant="secondary">
          Коллекции
        </ButtonLink>
        <p className="text-center">
          <Link href="/login">Сменить аккаунт</Link>
        </p>
        <LogoutButton />
      </div>
    </PageShell>
  );
}
