"use server";

import { cookies } from "next/headers";
import { parseApiError } from "@/shared/api/parse-api-error";
import { ACCESS_TOKEN_COOKIE } from "@/shared/auth/constants";

type LoginResponse = {
  accessToken: string;
};

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return apiUrl;
}

export async function loginAction(email: string, password: string) {
  const response = await fetch(`${getApiUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(parseApiError(text, response.status));
  }

  const data = JSON.parse(text) as LoginResponse;
  if (!data.accessToken) {
    throw new Error("Сервер не вернул токен");
  }

  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // для старых client-запросов через apiFetch (localStorage)
  return { accessToken: data.accessToken };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
}
