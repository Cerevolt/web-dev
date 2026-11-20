import {
  apiGet,
  apiRequest,
  clearSession,
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
  setSession,
} from "./api.js";

export async function register(payload) {
  return apiRequest("/accounts/register/", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

// Accepts both the current object form used by AuthContext and the upstream
// login(email, password, rememberMe) form. The object form returns the full
// backend response; the positional form keeps the upstream user-only result.
export async function login(credentialsOrEmail, password, rememberMe = false) {
  const objectInput =
    credentialsOrEmail !== null && typeof credentialsOrEmail === "object";

  const credentials = objectInput
    ? credentialsOrEmail
    : { email: credentialsOrEmail, password };

  const { rememberMe: rememberFromObject, ...loginCredentials } = credentials;
  const remember =
    rememberFromObject === undefined
      ? Boolean(rememberMe)
      : Boolean(rememberFromObject);

  const data = await apiRequest("/accounts/login/", {
    method: "POST",
    body: loginCredentials,
    auth: false,
  });

  setSession({
    access: data.access,
    refresh: data.refresh,
    user: data.user,
    remember,
  });

  return objectInput ? data : data.user;
}

export async function logout() {
  const refresh = getRefreshToken();

  try {
    if (refresh) {
      await apiRequest("/accounts/logout/", {
        method: "POST",
        body: { refresh },
        auth: true,
        skipRefresh: true,
      });
    }
  } catch {
    // Local cleanup must happen even if the server rejects the logout call.
  } finally {
    clearSession();
  }

  return true;
}

export async function getCurrentUser() {
  return apiGet("/accounts/me/");
}

export async function refresh() {
  return refreshAccessToken();
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  refresh,
  isAuthenticated,
};

export default authService;
