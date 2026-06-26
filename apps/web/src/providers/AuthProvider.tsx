"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, loginUser, registerUser, type SafeUser, type AuthResponse } from "@/lib/api";

interface AuthContextType {
  user: SafeUser | null;
  loading: boolean;
  login: (payload: any) => Promise<AuthResponse>;
  register: (payload: any) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("brainstack_access_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error("Failed to load user profile:", err);
        // Clean up invalid tokens
        localStorage.removeItem("brainstack_access_token");
        localStorage.removeItem("brainstack_refresh_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(payload: any): Promise<AuthResponse> {
    const res = await loginUser(payload);
    localStorage.setItem("brainstack_access_token", res.accessToken);
    localStorage.setItem("brainstack_refresh_token", res.refreshToken);
    setUser(res.user);
    return res;
  }

  async function register(payload: any): Promise<AuthResponse> {
    const res = await registerUser(payload);
    localStorage.setItem("brainstack_access_token", res.accessToken);
    localStorage.setItem("brainstack_refresh_token", res.refreshToken);
    setUser(res.user);
    return res;
  }

  function logout() {
    localStorage.removeItem("brainstack_access_token");
    localStorage.removeItem("brainstack_refresh_token");
    setUser(null);
    window.location.href = "/";
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
