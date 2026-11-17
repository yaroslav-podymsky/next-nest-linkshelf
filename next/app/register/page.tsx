'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/features/auth/ui';
import { apiFetch } from '@/shared/api/client';
import { PageShell } from '@/shared/ui/page-shell';

export default function RegisterPage() {
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
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      router.push('/login');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось создать аккаунт',
      );
    }
  };

  return (
    <PageShell
      title="Регистрация"
      subtitle="Email и пароль, минимум 6 символов."
    >
      <AuthForm
        submitLabel="Создать аккаунт"
        error={error}
        passwordMinLength={6}
        onSubmit={handleSubmit}
      />
      <p className="form-footer">
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </PageShell>
  );
}
