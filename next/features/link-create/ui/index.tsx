'use client';

import { FormEvent, useState } from 'react';
import { apiFetch } from '@/shared/api/client';
import '@/shared/ui/ui.css';

type LinkCreateFormProps = {
  collectionId: string;
  onCreated: () => void | Promise<void>;
};

export default function LinkCreateForm({
  collectionId,
  onCreated,
}: LinkCreateFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await apiFetch('/links', {
        method: 'POST',
        body: JSON.stringify({
          title,
          url,
          collectionId,
        }),
      });
      setTitle('');
      setUrl('');
      await onCreated();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось создать ссылку',
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stack stack--form">
      <label className="field">
        Название
        <input
          className="field-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>

      <label className="field">
        URL
        <input
          className="field-input"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />
      </label>

      <button
        className="btn btn--primary"
        type="submit"
        disabled={pending || !title.trim() || !url.trim()}
      >
        {pending ? 'Подождите...' : 'Добавить ссылку'}
      </button>

      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
