"use client";

import type { FC } from "react";
import "@/shared/ui/ui.css";

type TProps = {
  todoCount: number;
  readingCount: number;
  doneCount: number;
  allCount: number;
};

const CollectionStats: FC<TProps> = ({
  allCount,
  doneCount,
  readingCount,
  todoCount,
}) => {
  const items = [
    { key: "all", label: "Всего", value: allCount, tone: "all" },
    { key: "todo", label: "К прочтению", value: todoCount, tone: "todo" },
    { key: "reading", label: "Читаю", value: readingCount, tone: "reading" },
    { key: "done", label: "Готово", value: doneCount, tone: "done" },
  ] as const;

  return (
    <section className="collection-stats" aria-label="Статистика коллекции">
      <p className="collection-stats-title">Сводка</p>
      <ul className="collection-stats-grid">
        {items.map((item) => (
          <li
            key={item.key}
            className={`collection-stats-item collection-stats-item--${item.tone}`}
          >
            <span className="collection-stats-value">{item.value}</span>
            <span className="collection-stats-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CollectionStats;
