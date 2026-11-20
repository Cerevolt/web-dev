/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useMemo, useState } from "react";

import { AuthContext } from "./useAuth.js";
// Compatibility for any upstream file that still imports useAuth from here.
export { useAuth } from "./useAuth.js";

import {
  SESSION_CLEARED_EVENT,
  clearSession,
  getStoredUser,
  setSession,
} from "../services/api.js";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  refresh as refreshRequest,
  register as registerRequest,
} from "../services/authService.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const applyUser = useCallback((nextUser) => {
    setUser(nextUser || null);
    setIsAuthenticated(Boolean(nextUser));
  }, []);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      const storedUser = getStoredUser();
      if (!storedUser) {
        if (active) {
          applyUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        // The stored user is only a hint; the backend confirms the session and
        // supplies the current approval status.
        const current = await getCurrentUser();
        if (!active) return;

        const merged = { ...storedUser, ...current };
        setSession({ user: merged });
        applyUser(merged);
      } catch {
        if (!active) return;
        clearSession();
        applyUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    restoreSession();

    const onSessionCleared = () => {
      if (active) applyUser(null);
    };
    window.addEventListener(SESSION_CLEARED_EVENT, onSessionCleared);

    return () => {
      active = false;
      window.removeEventListener(SESSION_CLEARED_EVENT, onSessionCleared);
    };
  }, [applyUser]);

  const login = useCallback(
    async (credentials) => {
      // The backend response, not form input, is the source of truth for role.
      const data = await loginRequest(credentials);
      let nextUser = data?.user || null;

      try {
        // Login does not include status; refresh it from /accounts/me/ when
        // available so the route guards can enforce it immediately.
        const current = await getCurrentUser();
        if (current && typeof current === "object") {
          nextUser = { ...(nextUser || {}), ...current };
          setSession({ user: nextUser });
        }
      } catch {
        // A failed status lookup must not invalidate a successful login.
      }

      applyUser(nextUser);
      setIsLoading(false);
      return { ...data, user: nextUser };
    },
    [applyUser],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      applyUser(null);
      setIsLoading(false);
    }
  }, [applyUser]);

  const register = useCallback(async (payload) => registerRequest(payload), []);

  const refreshUser = useCallback(async () => {
    try {
      const current = await getCurrentUser();
      const merged = { ...getStoredUser(), ...current };
      setSession({ user: merged });
      applyUser(merged);
      return merged;
    } catch {
      clearSession();
      applyUser(null);
      return null;
    }
  }, [applyUser]);

  const value = useMemo(
    () => ({
      user,
      setUser: applyUser,
      isAuthenticated,
      isLoading,
      setIsLoading,
      login,
      logout,
      register,
      refreshUser,
      refreshSession: refreshRequest,
    }),
    [user, applyUser, isAuthenticated, isLoading, login, logout, register, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
