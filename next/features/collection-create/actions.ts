"use server";

import { cookies } from "next/headers";
import { parseApiError } from "@/shared/api/parse-api-error";
import { ACCESS_TOKEN_COOKIE } from "@/shared/auth/constants";

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return apiUrl;
}

export async function createCollectionAction(title: string) {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error("Название не может быть пустым");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) {
    throw new Error("Нужно войти в аккаунт");
  }

  const response = await fetch(`${getApiUrl()}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: trimmed }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(parseApiError(text, response.status));
  }

  if (!text) {
    return null;
  }

  return JSON.parse(text) as { id: string; title: string };
}
