'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/shared/api/client';
import { ButtonLink } from '@/shared/ui/button-link';
import { PageShell } from '@/shared/ui/page-shell';

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
    let ignore = false;

    async function loadProfile() {
      try {
        const me = await apiFetch<MeResponse>('/auth/me');
        if (ignore) return;
        setData(me);
      } catch (err) {
        if (ignore) return;
        const message =
          err instanceof Error ? err.message : 'Failed to load profile';
        setError(message);
        router.push('/login');
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      ignore = true;
    };
  }, [router]);

  if (loading) {
    return (
      <PageShell title="My profile" subtitle="Loading...">
        <p className="text-muted">Please wait</p>
      </PageShell>
    );
  }

  return (
    <PageShell title="My profile" subtitle="Data from Nest GET /auth/me">
      {data ? (
        <div className="profile-card">
          <div className="profile-row">
            <p className="profile-label">User ID</p>
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
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/collections" variant="secondary">
          Collections
        </ButtonLink>
        <p className="text-center">
          <Link href="/login">Switch account</Link>
        </p>
      </div>
    </PageShell>
  );
}
