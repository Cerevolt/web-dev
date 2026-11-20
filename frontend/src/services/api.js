const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

// One storage-key scheme for the whole app. Token keys match the existing
// upstream frontend so branch and friend work do not diverge after merging.
const ACCESS_TOKEN_KEY = "cerevolt_access";
const REFRESH_TOKEN_KEY = "cerevolt_refresh";
const USER_KEY = "cerevolt_user";

// Legacy keys are read only so an existing local session is not lost, but they
// are never written again and are removed by clearSession().
const LEGACY_ACCESS_TOKEN_KEY = "accessToken";
const LEGACY_REFRESH_TOKEN_KEY = "refreshToken";
const LEGACY_USER_KEY = "user";

export const SESSION_CLEARED_EVENT = "cerevolt:session-cleared";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function tokenKeys() {
  return [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, LEGACY_ACCESS_TOKEN_KEY, LEGACY_REFRESH_TOKEN_KEY];
}

function readToken(key) {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
}

export function getAccessToken() {
  return tokenKeys().map(readToken).find(Boolean) || null;
}

export function getRefreshToken() {
  return [REFRESH_TOKEN_KEY, LEGACY_REFRESH_TOKEN_KEY].map(readToken).find(Boolean) || null;
}

function readStoredUser(storage) {
  const raw =
    storage.getItem(USER_KEY) ||
    storage.getItem(LEGACY_USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getStoredUser() {
  return readStoredUser(localStorage) || readStoredUser(sessionStorage);
}

function storageHasToken(storage) {
  return tokenKeys().some((key) => Boolean(storage.getItem(key)));
}

function getSessionStorage() {
  return storageHasToken(sessionStorage) ? sessionStorage : localStorage;
}

function removeUserKeys() {
  [localStorage, sessionStorage].forEach((storage) => {
    storage.removeItem(USER_KEY);
    storage.removeItem(LEGACY_USER_KEY);
  });
}

function removeTokenKeys() {
  [localStorage, sessionStorage].forEach((storage) => {
    tokenKeys().forEach((key) => storage.removeItem(key));
  });
}

export function setSession({ access, refresh, user, remember } = {}) {
  const hasTokens = access !== undefined || refresh !== undefined;
  const hasUser = user !== undefined;

  if (!hasTokens && !hasUser) return;

  const storage =
    remember === false
      ? sessionStorage
      : remember === true
        ? localStorage
        : getSessionStorage();

  if (hasTokens) {
    removeTokenKeys();
    if (access) storage.setItem(ACCESS_TOKEN_KEY, access);
    if (refresh) storage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

  if (hasUser) {
    removeUserKeys();
    if (user) storage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function clearSession() {
  removeTokenKeys();
  removeUserKeys();
}

function notifySessionCleared() {
  window.dispatchEvent(new Event(SESSION_CLEARED_EVENT));
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json().catch(() => ({}));
  }

  return response.text().catch(() => "");
}

function errorMessage(data, fallback) {
  if (data && typeof data.detail === "string") return data.detail;
  if (data && typeof data.error === "string") return data.error;
  if (typeof data === "string" && data) return data;
  return fallback;
}

function encodeBody(body) {
  if (body === undefined || body === null) return undefined;
  return typeof body === "string" ? body : JSON.stringify(body);
}

let refreshInFlight = null;

export async function refreshAccessToken() {
  const refresh = getRefreshToken();

  if (!refresh) {
    clearSession();
    notifySessionCleared();
    return null;
  }

  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      const data = await parseResponse(response);

      if (!response.ok || !data?.access) {
        throw new Error("Refresh failed");
      }

      setSession({
        access: data.access,
        refresh: data.refresh || refresh,
        user: getStoredUser(),
      });
      return data.access;
    } catch {
      clearSession();
      notifySessionCleared();
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    auth = true,
    skipRefresh = false,
    headers = {},
  } = options;

  const url = /^https?:\/\//i.test(path)
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const requestHeaders = { ...headers };
  const serializedBody = encodeBody(body);

  if (serializedBody !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const token = auth ? getAccessToken() : null;
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: serializedBody,
    });
  } catch {
    throw new ApiError(
      "Unable to connect to the server. Please check whether the backend is running.",
      0,
      null,
    );
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    if (response.status === 401 && auth && !skipRefresh && token) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return apiRequest(path, { method, body, auth, skipRefresh: true, headers });
      }
    }
    throw new ApiError(errorMessage(data, "Request failed."), response.status, data);
  }

  return data;
}

export const apiGet = (endpoint, options = {}) =>
  apiRequest(endpoint, { ...options, method: "GET" });

export const apiPost = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: "POST",
    body: encodeBody(data),
  });

export const apiPatch = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: "PATCH",
    body: encodeBody(data),
  });

export const apiPut = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: "PUT",
    body: encodeBody(data),
  });

export const apiDelete = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: "DELETE",
    body: encodeBody(data),
  });

export default apiRequest;
