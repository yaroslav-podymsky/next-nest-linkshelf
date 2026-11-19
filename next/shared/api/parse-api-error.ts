export function parseApiError(text: string, status: number): string {
  if (!text) {
    return `Request failed with status ${status}`;
  }

  try {
    const data = JSON.parse(text) as {
      message?: string | string[];
      error?: string;
    };

    if (Array.isArray(data.message)) {
      return data.message.join(", ");
    }

    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }

    if (typeof data.error === "string" && data.error.length > 0) {
      return data.error;
    }
  } catch {
    // not JSON
  }

  return text;
}
