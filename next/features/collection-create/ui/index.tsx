"use client";

import { FormEvent, useState } from "react";
import { createCollectionAction } from "../actions";
import "@/shared/ui/ui.css";

type CollectionsFormProps = {
  onCreated: () => void | Promise<void>;
};

export default function CollectionsForm({ onCreated }: CollectionsFormProps) {
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await createCollectionAction(title);
      setTitle("");
      await onCreated();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось создать коллекцию"
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

      <button
        className="btn btn--primary"
        type="submit"
        disabled={pending || !title.trim()}
      >
        {pending ? "Подождите..." : "Добавить коллекцию"}
      </button>

      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
