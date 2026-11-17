"use client";

import { useEffect } from "react";

const Error = ({ error, retry }: { error: unknown; retry: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h2>Ошибка</h2>
      <button onClick={() => retry()}>повтор</button>
    </div>
  );
};

export default Error;
