"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/shared/api/client";
import "@/shared/ui/ui.css";

type TagCreateFormProps = {
  onCreated: () => void | Promise<void>;
};

export default function TagCreateForm({ onCreated }: TagCreateFormProps) {
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setPending(true);
    setError(null);
    try {
      await apiFetch("/tags", {
        method: "POST",
        body: JSON.stringify({ name: trimmed }),
      });
      setName("");
      await onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать тег");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="tag-create-form">
        <label className="field">
          Новый тег
          <input
            className="field-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="например: nest"
          />
        </label>
        <button
          className="btn btn--secondary"
          type="submit"
          disabled={pending || !name.trim()}
        >
          {pending ? "Подождите..." : "Создать тег"}
        </button>
      </form>
      {error ? <p className="form-error">{error}</p> : null}
    </>
  );
}
