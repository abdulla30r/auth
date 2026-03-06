const API_URL = import.meta.env.VITE_API_URL;

/**
 * Make an authenticated fetch request.
 * Sends the accessToken in the Authorization header
 * and includes cookies (for refresh token).
 */
export async function authFetch(path: string, accessToken: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
  return res;
}
