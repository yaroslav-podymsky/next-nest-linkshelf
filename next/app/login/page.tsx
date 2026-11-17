'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/features/auth/ui';
import { apiFetch } from '@/shared/api/client';
import { PageShell } from '@/shared/ui/page-shell';

type LoginResponse = {
  accessToken: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError(null);
    try {
      const data = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('nextAccessToken', data.accessToken);
      router.push('/me');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти');
    }
  };

  return (
    <PageShell title="Вход" subtitle="Войдите в аккаунт LinkShelf.">
      <AuthForm submitLabel="Войти" error={error} onSubmit={handleSubmit} />
      <p className="form-footer">
        Нет аккаунта? <Link href="/register">Создать аккаунт</Link>
      </p>
    </PageShell>
  );
}
