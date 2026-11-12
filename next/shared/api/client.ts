const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('nextAccessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('nextAccessToken');
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    const text = await response.text();
    throw new Error(parseApiError(text, response.status));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function parseApiError(text: string, status: number): string {
  if (!text) {
    return `Request failed with status ${status}`;
  }

  try {
    const data = JSON.parse(text) as {
      message?: string | string[];
      error?: string;
    };

    if (Array.isArray(data.message)) {
      return data.message.join(', ');
    }

    if (typeof data.message === 'string' && data.message.length > 0) {
      return data.message;
    }

    if (typeof data.error === 'string' && data.error.length > 0) {
      return data.error;
    }
  } catch {
    // not JSON — fall through
  }

  return text;
}
