
import { apiGet, apiPost } from "./api";

const ACCESS_KEY = "cerevolt_access";
const REFRESH_KEY = "cerevolt_refresh";

const authService = {
  async login(email, password, rememberMe = false) {
    const response = await apiPost("/accounts/login/", {
      email,
      password,
    });

    const storage = rememberMe ? localStorage : sessionStorage;

    // Clear previous tokens from both storage locations.
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(REFRESH_KEY);

    storage.setItem(ACCESS_KEY, response.access);
    storage.setItem(REFRESH_KEY, response.refresh);

    return response.user;
  },

  async logout() {
    const refresh =
      localStorage.getItem(REFRESH_KEY) ||
      sessionStorage.getItem(REFRESH_KEY);

    try {
      if (refresh) {
        await apiPost("/accounts/logout/", { refresh });
      }
    } finally {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      sessionStorage.removeItem(ACCESS_KEY);
      sessionStorage.removeItem(REFRESH_KEY);
    }
  },

  getCurrentUser() {
    return apiGet("/accounts/me/");
  },

  isAuthenticated() {
    return Boolean(
      localStorage.getItem(ACCESS_KEY) ||
      sessionStorage.getItem(ACCESS_KEY)
    );
  },
};

export default authService;
