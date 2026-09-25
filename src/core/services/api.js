const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getToken() {
  return (
    localStorage.getItem("lms_token")
  );
}

export async function apiRequest(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
  } = options;

  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  const token = getToken();

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (typeof data === "object" && data?.message) ||
      (typeof data === "object" && data?.title) ||
      (typeof data === "string" && data) ||
      `Request failed with status ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}



export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok)
    throw new Error(
      data?.message || data?.title || `Request failed (${response.status})`,
    );
  return data;
}

export { API_BASE_URL };