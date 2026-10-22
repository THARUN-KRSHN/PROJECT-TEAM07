"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "officer" | "researcher" | "admin";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  agency: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PRESET_USERS: Record<UserRole, AuthUser> = {
  officer: {
    name: "Dr. Anjali Nair",
    email: "anjali.ksdma@kerala.gov.in",
    role: "officer",
    roleLabel: "Disaster Management Officer",
    agency: "Kerala State Disaster Management Authority (KSDMA)",
  },
  researcher: {
    name: "Prof. K. Ramesh",
    email: "k.ramesh@geotech.res.in",
    role: "researcher",
    roleLabel: "Geotechnical AI Researcher",
    agency: "Centre for Earth Science Studies",
  },
  admin: {
    name: "System Administrator",
    email: "admin@giriraksha.org",
    role: "admin",
    roleLabel: "Platform Administrator",
    agency: "GiriRaksha Consortium",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Keep the first render identical on the server and client. Storage is browser-only.
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("giriraksha_auth");
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  }, []);

  const loginAs = (role: UserRole) => {
    const authUser = PRESET_USERS[role];
    setUser(authUser);
    try {
      localStorage.setItem("giriraksha_auth", JSON.stringify(authUser));
    } catch {
      // Ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("giriraksha_auth");
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
