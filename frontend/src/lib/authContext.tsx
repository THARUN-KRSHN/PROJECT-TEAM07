"use client";

import React, { createContext, useContext, useState } from "react";

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
  // Use lazy state initialization to read from storage safely without triggering effect cascading renders
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("giriraksha_auth");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

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
