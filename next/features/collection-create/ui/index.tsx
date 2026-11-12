'use client';

import { FormEvent, useState } from 'react';
import { apiFetch } from '@/shared/api/client';
import '@/shared/ui/ui.css';

type CollectionsFormProps = {
  onCreated: () => void | Promise<void>;
};

export default function CollectionsForm({ onCreated }: CollectionsFormProps) {
  const [title, setTitle] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await apiFetch('/collections', {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
      setTitle('');
      await onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create collection');
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stack stack--form">
      <label className="field">
        Title
        <input
          className="field-input"
          type="text"
          placeholder="e.g. Nest"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>

      <button
        className="btn btn--primary"
        type="submit"
        disabled={pending || !title.trim()}
      >
        {pending ? 'Please wait...' : 'Add collection'}
      </button>

      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
