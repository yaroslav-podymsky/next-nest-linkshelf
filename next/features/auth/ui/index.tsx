'use client';

import { FormEvent, useState } from 'react';
import '@/shared/ui/ui.css';

type AuthFormProps = {
  submitLabel: string;
  error?: string | null;
  passwordMinLength?: number;
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>;
};

export default function AuthForm({
  submitLabel,
  error,
  passwordMinLength,
  onSubmit,
}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      await onSubmit({ email, password });
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stack stack--form">
      <label className="field">
        Email
        <input
          className="field-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label className="field">
        Password
        <input
          className="field-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={passwordMinLength}
        />
      </label>

      <button className="btn btn--primary" type="submit" disabled={pending}>
        {pending ? 'Please wait...' : submitLabel}
      </button>

      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
